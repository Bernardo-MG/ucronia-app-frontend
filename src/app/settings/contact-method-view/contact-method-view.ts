import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SettingsInfo } from '@app/settings/settings-info/settings-info';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactMethod } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable, Subscription } from 'rxjs';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';

@Component({
  selector: 'assoc-contact-method-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, SettingsInfo, DrawerModule, ButtonModule, ContactMethodList, ContactMethodForm],
  templateUrl: './contact-method-view.html'
})
export class ContactMethodView implements OnInit {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly destroyRef = inject(DestroyRef);

  public contactMethodData = new Page<ContactMethod>();
  public readonly Dialog = Dialog;
  public dialog = Dialog.NONE;
  public failures = new FailureStore();
  /**
   * Loading flag.
   */
  public loading = false;
  public readonly permissions: Permissions;
  public selectedData = new ContactMethod();

  private listRequest?: Subscription;

  public constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.directory.contactMethod.create),
      edit: authService.hasPermission(UcroniaPermissions.directory.contactMethod.update),
      delete: authService.hasPermission(UcroniaPermissions.directory.contactMethod.delete)
    };
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.load();
  }

  // Event handlers
  public load(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.loading = true;

    this.listRequest = this.contactMethodService.getAll(page)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading = false)
      )
      .subscribe(response => this.contactMethodData = response);
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onCreate(toCreate: ContactMethod): void {
    this.call(
      () => this.contactMethodService.create(toCreate),
      () => this.load()
    );
  }

  public onDelete(event: Event): void {
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => this.call(() => this.contactMethodService.delete(number), () => this.load())
    });
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onShowEdit(contactMethod: ContactMethod) {
    this.failures.clear();
    this.selectedData = contactMethod;
    this.dialog = Dialog.EDIT;
  }

  public onShowInfo(data: ContactMethod): void {
    this.selectedData = data;
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onUpdate(toUpdate: ContactMethod): void {
    this.call(
      () => this.contactMethodService.update(toUpdate),
      () => this.load(this.contactMethodData.page)
    );
  }

  // Private methods
  private call(
    action: () => Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    action()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading = false)
      )
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
  EDIT = 'edit',
  CREATE = 'create'
}
