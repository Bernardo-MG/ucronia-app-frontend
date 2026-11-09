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
import { ImageForm, ImageFormData } from '../image-form/image-form';
import { ImageInfo } from '../image-info/image-info';
import { ImageList } from '../image-list/image-list';
import { ImageService } from '../image-service';

@Component({
  selector: 'assoc-image-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, ButtonModule, DrawerModule, FormsModule, ImageForm, ImageInfo, ImageList, InputTextModule],
  templateUrl: './image-view.html'
})
export class ImageView implements OnInit {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(ImageService);

  protected get breadcrumbs(): AssetFolder[] {
    const folders: AssetFolder[] = [];
    let current = this.folders.find(folder => folder.number === this.currentFolderNumber);
    while (current) {
      folders.unshift(current);
      current = this.folders.find(folder => folder.number === current?.parentNumber);
    }
    return folders;
  }
  protected get childFolders(): AssetFolder[] {
    return this.folders.filter(folder => folder.parentNumber === this.currentFolderNumber);
  }
  protected readonly contentUrl = (number: number) => this.service.contentUrl(number);
  protected currentFolderNumber: number | null = null;
  protected data = new Page<Asset>();
  protected readonly Dialog = Dialog;
  protected get dialog(): Dialog {
    return this.currentDialog;
  }
  protected set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.currentDialog = value;
    }
  }
  protected failures = new FailureStore();
  protected folderName = '';
  protected folders: AssetFolder[] = [];
  protected readonly permissions: Permissions;
  protected selectedData = new Asset();
  protected readonly status = { loading: false };

  private currentDialog = Dialog.NONE;
  private readonly detailRequest = new DetailRequest();
  private folderRequest?: Subscription;
  private listRequest?: Subscription;
  private readonly sort = new Sorting([new SortingProperty('name')]);

  public constructor() {
    const auth = inject(AuthService);
    this.permissions = {
      create: auth.hasPermission(UcroniaPermissions.image.create),
      edit: auth.hasPermission(UcroniaPermissions.image.update),
      delete: auth.hasPermission(UcroniaPermissions.image.delete)
    };
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.loadFolders();
    this.load();
  }

  // Event handlers
  protected createFolder(): void {
    const name = this.folderName.trim();
    if (!name) return;
    this.callFolder(() => this.service.createFolder(name, this.currentFolderNumber));
  }

  protected load(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.status.loading = true;
    const request = this.currentFolderNumber === null ? this.service.getRootImages(page, this.sort)
      : this.service.getFolderImages(this.currentFolderNumber, page, this.sort);
    this.listRequest = request
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
      .subscribe(data => this.data = data);
  }

  protected onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  protected onChangeDirection(event: SortingEvent): void {
    const direction = event.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(event.field, direction));
    this.load(this.data.page);
  }

  protected onCreate(data: ImageFormData): void {
    const file = data.file;
    if (file) {
      const metadata = { ...data.image };
      const folderNumber = this.currentFolderNumber;
      this.call(() => this.service.create(metadata, file)
        .pipe(switchMap(image => folderNumber === null ? of(image)
          : this.service.move(image.number, folderNumber))));
    }
  }

  protected onDelete(event: Event): void {
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

  protected onDeleteFolder(event: Event): void {
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
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.status.loading = false)
          )
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

  protected onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  protected onShowInfo(image: Asset): void {
    this.detailRequest.cancel();
    this.selectedData = image;
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.get(image.number)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false),
        this.detailRequest.untilCancelled()
      )
      .subscribe(data => this.selectedData = data);
  }

  protected onUpdate(data: ImageFormData): void {
    const metadata = { ...data.image };
    const file = data.file;
    const folderNumber = metadata.folderNumber;
    const moveRequired = folderNumber !== this.selectedData.folderNumber;
    this.call(() => this.service.update(metadata, file)
      .pipe(switchMap(image => moveRequired
        ? this.service.move(image.number, folderNumber) : of(image))));
  }

  protected openFolder(number: number | null = null): void {
    this.currentFolderNumber = number;
    this.load();
  }

  protected showCreateFolder(): void {
    this.folderName = '';
    this.dialog = Dialog.CREATE_FOLDER;
  }

  protected showEditFolder(): void {
    const folder = this.folders.find(item => item.number === this.currentFolderNumber);
    if (folder) {
      this.folderName = folder.name;
      this.dialog = Dialog.EDIT_FOLDER;
    }
  }

  protected updateFolder(): void {
    const folder = this.folders.find(item => item.number === this.currentFolderNumber);
    const name = this.folderName.trim();
    if (!folder || !name) return;
    this.callFolder(() => this.service.updateFolder({ ...folder, name }));
  }

  // Data loading
  private loadFolders(): void {
    this.folderRequest?.unsubscribe();
    this.folderRequest = this.service.getFolders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(folders => this.folders = folders);
  }

  // Private methods
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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
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
