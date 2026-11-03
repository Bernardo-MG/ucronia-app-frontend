import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailRequest } from '@app/shared/request/detail-request';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Asset, AssetFolder } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { finalize, Observable, of, Subscription, switchMap } from 'rxjs';
import { downloadFile } from '../file-download';
import { FileForm, FileFormData } from '../file-form/file-form';
import { FileInfo } from '../file-info/file-info';
import { FileList } from '../file-list/file-list';
import { FileService } from '../file-service';

@Component({
  selector: 'assoc-file-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, ButtonModule, DrawerModule, FormsModule, FileForm, FileInfo, FileList, InputTextModule],
  templateUrl: './file-view.html'
})
export class FileView implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  private readonly detailRequest = new DetailRequest();
  private readonly service = inject(FileService);
  private listRequest?: Subscription;
  private folderRequest?: Subscription;
  private readonly confirmationService = inject(ConfirmationService);

  public readonly Dialog = Dialog;
  public readonly permissions: Permissions;
  public readonly status = { loading: false };
  public readonly contentUrl = (number: number) => this.service.contentUrl(number);

  public data = new Page<Asset>();
  public folders: AssetFolder[] = [];
  public selectedData = new Asset();
  public currentFolderNumber: number | null = null;
  public folderName = '';
  private currentDialog = Dialog.NONE;

  public get dialog(): Dialog {
    return this.currentDialog;
  }

  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.currentDialog = value;
    }
  }
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
    this.listRequest?.unsubscribe();
    this.status.loading = true;
    const request = this.currentFolderNumber === null ? this.service.getRootFiles(page, this.sort)
      : this.service.getFolderFiles(this.currentFolderNumber, page, this.sort);
    this.listRequest = request
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
      .subscribe(data => this.data = data);
  }

  public get childFolders(): AssetFolder[] {
    return this.folders.filter(folder => folder.parentNumber === this.currentFolderNumber);
  }

  public get breadcrumbs(): AssetFolder[] {
    const folders: AssetFolder[] = [];
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
    const { number, parentNumber } = folder;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar esta carpeta vacía?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (this.destroyRef.destroyed || this.currentFolderNumber !== number) return;

        this.status.loading = true;
        this.service.deleteFolder(number)
          .pipe(finalize(() => this.status.loading = false))
          .subscribe({
            next: () => {
              if (this.destroyRef.destroyed) return;

              this.loadFolders();
              if (this.currentFolderNumber === number) {
                this.currentFolderNumber = parentNumber;
                this.load();
              }
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

  public onShowInfo(file: Asset): void {
    this.detailRequest.cancel();
    this.selectedData = file;
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.get(file.number)
      .pipe(finalize(() => this.status.loading = false))
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(data => this.selectedData = data);
  }

  public onCreate(data: FileFormData): void {
    const content = data.content;
    if (content) {
      const metadata = { ...data.metadata };
      const folderNumber = this.currentFolderNumber;
      this.call(() => this.service.create(metadata, content)
        .pipe(switchMap(file => folderNumber === null ? of(file)
          : this.service.move(file.number, folderNumber))));
    }
  }

  public onUpdate(data: FileFormData): void {
    const metadata = { ...data.metadata };
    const content = data.content;
    const folderNumber = metadata.folderNumber;
    const moveRequired = folderNumber !== this.selectedData.folderNumber;
    this.call(() => this.service.update(metadata, content)
      .pipe(switchMap(file => moveRequired
        ? this.service.move(file.number, folderNumber) : of(file))));
  }

  public download(file: Asset): void {
    this.status.loading = true;
    this.service.content(file.number)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(content => downloadFile(content, file.name));
  }

  public onDelete(event: Event): void {
    const dialog = this.dialog;
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.number !== number
        ) {
          return;
        }

        this.call(() => this.service.delete(number));
      }
    });
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  private call(action: () => Observable<Asset>): void {
    const dialog = this.dialog;
    const selectedData = this.selectedData;
    const folderNumber = this.currentFolderNumber;
    const ownsDrawer = () => !this.destroyRef.destroyed
      && this.dialog === dialog
      && this.selectedData === selectedData
      && this.currentFolderNumber === folderNumber;

    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          if (this.destroyRef.destroyed) return;

          if (ownsDrawer()) {
            this.failures.clear();
            this.dialog = Dialog.NONE;
          }
          this.load(this.data.page);
        },
        error: error => {
          if (ownsDrawer()) {
            this.failures = error instanceof FailureResponse ? error.failures : new FailureStore();
          }
        }
      });
  }

  private callFolder(action: () => Observable<AssetFolder>): void {
    const dialog = this.dialog;
    const selectedData = this.selectedData;
    const folderNumber = this.currentFolderNumber;
    const ownsDrawer = () => !this.destroyRef.destroyed
      && this.dialog === dialog
      && this.selectedData === selectedData
      && this.currentFolderNumber === folderNumber;

    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          if (this.destroyRef.destroyed) return;

          if (ownsDrawer()) {
            this.dialog = Dialog.NONE;
          }
          this.loadFolders();
          this.load();
        }
      });
  }

  private loadFolders(): void {
    this.folderRequest?.unsubscribe();
    this.folderRequest = this.service.getFolders()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
