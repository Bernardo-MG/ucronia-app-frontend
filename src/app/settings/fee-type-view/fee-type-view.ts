import { Component, inject, OnInit } from '@angular/core';
import { SettingsInfo } from '@app/settings/settings-info/settings-info';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { FeeType } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { FeeTypeForm } from '../fee-type-form/fee-type-form';
import { FeeTypeList } from '../fee-type-list/fee-type-list';
import { FeeTypeService } from '../fee-type-service';

@Component({
  selector: 'assoc-fee-type-view',
  imports: [DrawerFormActions, DrawerActions, SettingsInfo, DrawerModule, ButtonModule, FeeTypeList, FeeTypeForm],
  templateUrl: './fee-type-view.html'
})
export class FeeTypeView implements OnInit {

  private readonly feeTypeService = inject(FeeTypeService);

  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public selectedData = new FeeType();
  public feeTypeData = new Page<FeeType>();

  /**
   * Loading flag.
   */
  public loading = false;

  public failures = new FailureStore();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.feeType.create),
      edit: authService.hasPermission(UcroniaPermissions.feeType.update),
      delete: authService.hasPermission(UcroniaPermissions.feeType.delete)
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowInfo(data: FeeType): void {
    this.selectedData = data;
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onShowEdit(feeType: FeeType) {
    this.failures.clear();
    this.selectedData = feeType;
    this.dialog = Dialog.EDIT;
  }

  public onCreate(toCreate: FeeType): void {
    this.call(
      () => this.feeTypeService.create(toCreate),
      () => this.load()
    );
  }

  public onUpdate(toUpdate: FeeType): void {
    this.call(
      () => this.feeTypeService.update(toUpdate),
      () => this.load(this.feeTypeData.page)
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
      accept: () => this.call(() => this.feeTypeService.delete(number), () => this.load())
    });
  }

  // DATA LOADING

  public load(page: number | undefined = undefined): void {
    this.loading = true;

    this.feeTypeService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.feeTypeData = response);
  }

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
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
  EDIT = 'edit',
  CREATE = 'create'
}
