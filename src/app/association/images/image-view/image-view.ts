import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Image, ImageFolder } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { finalize, Observable, of, switchMap } from 'rxjs';
import { ImageForm, ImageFormData } from '../image-form/image-form';
import { ImageInfo } from '../image-info/image-info';
import { ImageList } from '../image-list/image-list';
import { ImageService } from '../image-service';

@Component({
  selector: 'assoc-image-view',
  imports: [ButtonModule, DrawerModule, FormsModule, ImageForm, ImageInfo, ImageList, InputTextModule],
  templateUrl: './image-view.html'
})
export class ImageView implements OnInit {
  private readonly service = inject(ImageService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly Dialog = Dialog;
  public readonly permissions: Permissions;
  public readonly status = { loading: false };
  public readonly contentUrl = (number: number) => this.service.contentUrl(number);

  public data = new Page<Image>();
  public folders: ImageFolder[] = [];
  public selectedData = new Image();
  public currentFolderNumber: number | null = null;
  public folderName = '';
  public dialog = Dialog.NONE;
  public failures = new FailureStore();
  private sort = new Sorting([new SortingProperty('name')]);

  constructor() {
    const auth = inject(AuthService);
    this.permissions = {
      create: auth.hasPermission(UcroniaPermissions.image.create),
      edit: auth.hasPermission(UcroniaPermissions.image.update),
      delete: auth.hasPermission(UcroniaPermissions.image.delete)
    };
  }

  public ngOnInit(): void {
    this.loadFolders();
    this.load();
  }

  public load(page: number | undefined = undefined): void {
    this.status.loading = true;
    const request = this.currentFolderNumber === null ? this.service.getRootImages(page, this.sort)
      : this.service.getFolderImages(this.currentFolderNumber, page, this.sort);
    request
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(data => this.data = data);
  }

  public get childFolders(): ImageFolder[] {
    return this.folders.filter(folder => folder.parentNumber === this.currentFolderNumber);
  }

  public get breadcrumbs(): ImageFolder[] {
    const folders: ImageFolder[] = [];
    let current = this.folders.find(folder => folder.number === this.currentFolderNumber);
    while (current) {
      folders.unshift(current);
      current = this.folders.find(folder => folder.number === current?.parentNumber);
    }
    return folders;
  }

  public openFolder(number: number | null = null): void {
    this.currentFolderNumber = number;
    this.load();
  }

  public showCreateFolder(): void {
    this.folderName = '';
    this.dialog = Dialog.CREATE_FOLDER;
  }

  public showEditFolder(): void {
    const folder = this.folders.find(item => item.number === this.currentFolderNumber);
    if (folder) {
      this.folderName = folder.name;
      this.dialog = Dialog.EDIT_FOLDER;
    }
  }

  public createFolder(): void {
    const name = this.folderName.trim();
    if (!name) return;
    this.callFolder(() => this.service.createFolder(name, this.currentFolderNumber));
  }

  public updateFolder(): void {
    const folder = this.folders.find(item => item.number === this.currentFolderNumber);
    const name = this.folderName.trim();
    if (!folder || !name) return;
    this.callFolder(() => this.service.updateFolder({ ...folder, name }));
  }

  public onDeleteFolder(event: Event): void {
    const folder = this.folders.find(item => item.number === this.currentFolderNumber);
    if (!folder) return;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar esta carpeta vacía?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        this.status.loading = true;
        this.service.deleteFolder(folder.number)
          .pipe(finalize(() => this.status.loading = false))
          .subscribe({
            next: () => {
              this.currentFolderNumber = folder.parentNumber;
              this.loadFolders();
              this.load();
            }
          });
      }
    });
  }

  public onChangeDirection(event: SortingEvent): void {
    const direction = event.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(event.field, direction));
    this.load(this.data.page);
  }

  public onShowInfo(image: Image): void {
    this.selectedData = image;
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.get(image.number)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(data => this.selectedData = data);
  }

  public onCreate(data: ImageFormData): void {
    const file = data.file;
    if (file) {
      this.call(() => this.service.create(data.image, file)
        .pipe(switchMap(image => this.currentFolderNumber === null ? of(image)
          : this.service.move(image.number, this.currentFolderNumber))));
    }
  }

  public onUpdate(data: ImageFormData): void {
    this.call(() => this.service.update(data.image, data.file)
      .pipe(switchMap(image => data.image.folderNumber === this.selectedData.folderNumber ? of(image)
        : this.service.move(image.number, data.image.folderNumber))));
  }

  public onDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => this.call(() => this.service.delete(this.selectedData.number))
    });
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) this.dialog = Dialog.NONE;
  }

  private call(action: () => Observable<Image>): void {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.load(this.data.page);
        },
        error: error => {
          this.failures = error instanceof FailureResponse ? error.failures : new FailureStore();
        }
      });
  }

  private callFolder(action: () => Observable<ImageFolder>): void {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.dialog = Dialog.NONE;
          this.loadFolders();
          this.load();
        }
      });
  }

  private loadFolders(): void {
    this.service.getFolders()
      .subscribe(folders => this.folders = folders);
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create',
  CREATE_FOLDER = 'create-folder',
  EDIT_FOLDER = 'edit-folder'
}
