import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { FeeType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { FeeTypeForm } from '../fee-type-form/fee-type-form';
import { FeeTypeList } from '../fee-type-list/fee-type-list';
import { FeeTypeService } from '../fee-type-service';

@Component({
  selector: 'assoc-fee-type-view',
  imports: [ButtonModule, DrawerModule, FeeTypeList, FeeTypeForm],
  templateUrl: './fee-type-view.html'
})
export class FeeTypeView implements OnInit {

  private readonly feeTypeService = inject(FeeTypeService);

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

  public onShowEdit(feeType: FeeType) {
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

  public onDelete(number: number): void {
    this.call(
      () => this.feeTypeService.delete(number),
      () => this.load()
    );
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
