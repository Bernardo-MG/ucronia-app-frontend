import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Image } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { ImageForm, ImageFormData } from '../image-form/image-form';
import { ImageInfo } from '../image-info/image-info';
import { ImageList } from '../image-list/image-list';
import { ImageService } from '../image-service';

@Component({
  selector: 'assoc-image-view',
  imports: [ButtonModule, DrawerModule, ImageForm, ImageInfo, ImageList],
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
  public selectedData = new Image();
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
    this.load();
  }

  public load(page: number | undefined = undefined): void {
    this.status.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(data => this.data = data);
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
      this.call(() => this.service.create(data.image, file));
    }
  }

  public onUpdate(data: ImageFormData): void {
    this.call(() => this.service.update(data.image, data.file));
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
  CREATE = 'create'
}
