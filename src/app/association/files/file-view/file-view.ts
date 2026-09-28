import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { StoredFile, FileFolder } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { finalize, Observable, of, switchMap } from 'rxjs';
import { downloadFile } from '../file-download';
import { FileForm, FileFormData } from '../file-form/file-form';
import { FileInfo } from '../file-info/file-info';
import { FileList } from '../file-list/file-list';
import { FileService } from '../file-service';

@Component({
  selector: 'assoc-file-view',
  imports: [ButtonModule, DrawerModule, FormsModule, FileForm, FileInfo, FileList, InputTextModule],
  templateUrl: './file-view.html'
})
export class FileView implements OnInit {
  private readonly service = inject(FileService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly Dialog = Dialog;
  public readonly permissions: Permissions;
  public readonly status = { loading: false };

  public data = new Page<StoredFile>();
  public folders: FileFolder[] = [];
  public selectedData = new StoredFile();
  public currentFolderNumber: number | null = null;
  public folderName = '';
  public dialog = Dialog.NONE;
  public failures = new FailureStore();
  private sort = new Sorting([new SortingProperty('name')]);

  constructor() {
    const auth = inject(AuthService);
    this.permissions = {
      create: auth.hasPermission(UcroniaPermissions.file.create),
      edit: auth.hasPermission(UcroniaPermissions.file.update),
      delete: auth.hasPermission(UcroniaPermissions.file.delete)
    };
  }

  public ngOnInit(): void {
    this.loadFolders();
    this.load();
  }

  public load(page: number | undefined = undefined): void {
    this.status.loading = true;
    const request = this.currentFolderNumber === null ? this.service.getRootFiles(page, this.sort)
      : this.service.getFolderFiles(this.currentFolderNumber, page, this.sort);
    request
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(data => this.data = data);
  }

  public get childFolders(): FileFolder[] {
    return this.folders.filter(folder => folder.parentNumber === this.currentFolderNumber);
  }

  public get breadcrumbs(): FileFolder[] {
    const folders: FileFolder[] = [];
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

  public onShowInfo(file: StoredFile): void {
    this.selectedData = file;
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.get(file.number)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(data => this.selectedData = data);
  }

  public onCreate(data: FileFormData): void {
    if (data.content) {
      this.call(() => this.service.create(data.metadata, data.content!)
        .pipe(switchMap(file => this.currentFolderNumber === null ? of(file)
          : this.service.move(file.number, this.currentFolderNumber))));
    }
  }

  public onUpdate(data: FileFormData): void {
    this.call(() => this.service.update(data.metadata, data.content)
      .pipe(switchMap(file => data.metadata.folderNumber === this.selectedData.folderNumber ? of(file)
        : this.service.move(file.number, data.metadata.folderNumber))));
  }

  public download(file: StoredFile): void {
    this.status.loading = true;
    this.service.content(file.number)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(content => downloadFile(content, file.name));
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

  private call(action: () => Observable<StoredFile>): void {
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

  private callFolder(action: () => Observable<FileFolder>): void {
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
