import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { Component, inject, OnInit } from '@angular/core';
import { SettingsInfo } from '@app/settings/settings-info/settings-info';
import { NameForm } from '@app/shared/data/name-form/name-form';
import { NameList } from '@app/shared/data/name-list/name-list';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Author } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { AuthorService } from '../author-service';

@Component({
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, DrawerModule, NameList, ButtonModule, NameForm, SettingsInfo],
  templateUrl: './library-author-list-view.html'
})
export class LibraryAuthorListView implements OnInit {

  private readonly service = inject(AuthorService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;

  public data = new Page<Author>();
  public loading = false;
  public failures = new FailureStore();
  public dialog = Dialog.NONE;
  public readonly Dialog = Dialog;
  public selected = new Author();
  private sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.library.author.create),
      edit: authService.hasPermission(UcroniaPermissions.library.author.update),
      delete: authService.hasPermission(UcroniaPermissions.library.author.delete)
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowCreate(): void {
    this.selected = new Author();
    this.dialog = Dialog.CREATE;
    this.failures.clear();
  }

  public onShowInfo(item: any): void {
    this.selected = item;
    this.dialog = Dialog.INFO;
    this.failures.clear();
  }

  public onShowEdit(item: any): void {
    this.selected = item;
    this.dialog = Dialog.EDIT;
    this.failures.clear();
  }

  public onReject(): void {
    this.dialog = Dialog.NONE;
    this.failures.clear();
  }

  public onCancelEdit(): void {
    this.dialog = Dialog.INFO;
    this.failures.clear();
  }

  public onDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.call(
        () => this.service.delete(this.selected.number),
        () => {
          this.load(this.data.page);
        }
      )
    });
  }

  public onSave(data: any): void {
    if (this.dialog === Dialog.CREATE) {
      this.onCreate(data);
    } else {
      this.onUpdate(data);
    }
  }

  public onCreate(data: any): void {
    this.loading = true;
    this.service.create(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.load(this.data.page);
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onUpdate(data: any): void {
    this.loading = true;
    this.service.update(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.load(this.data.page);
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onSort(sorting: { field: string; order: number }): void {
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page);
  }

  // DRAWER

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  // DATA LOADING

  public load(page: number | undefined = undefined): void {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
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
  CREATE = 'create',
  EDIT = 'edit'
}
