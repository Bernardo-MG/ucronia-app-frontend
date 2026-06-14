import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { FeeTypeForm } from '../fee-type-form/fee-type-form';
import { FeeTypeList } from '../fee-type-list/fee-type-list';
import { FeeTypeService } from '../fee-type-service';

@Component({
  selector: 'assoc-fee-type-list-inner-view',
  imports: [PanelModule, ButtonModule, DialogModule, FeeTypeList, FeeTypeForm],
  templateUrl: './fee-type-list-inner-view.html'
})
export class FeeTypeListInnerView implements OnInit {

  private readonly feeTypeService = inject(FeeTypeService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public selectedData = new FeeType();
  public feeTypes: FeeType[] = [];
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
      create: authService.hasPermission("fee_type", "create"),
      edit: authService.hasPermission("fee_type", "update"),
      delete: authService.hasPermission("fee_type", "delete")
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowEditFeeType(contactMethod: FeeType) {
    this.selectedData = contactMethod;
    this.dialog = Dialog.EDIT;
  }

  public onCreateFeeType(toCreate: FeeType): void {
    this.mutation(
      this.feeTypeService.create(toCreate),
      () => this.load()
    );
  }

  public onUpdateFeeType(toUpdate: FeeType): void {
    this.mutation(
      this.feeTypeService.update(toUpdate),
      () => this.load(this.feeTypeData.page)
    );
  }

  public onDeleteFeeType(number: number): void {
    this.mutation(
      this.feeTypeService.delete(number),
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

  public onDialogVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // PRIVATE METHODS

  private mutation(
    observable: Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    observable
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