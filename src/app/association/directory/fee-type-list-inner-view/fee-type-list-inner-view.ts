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

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public selectedData = new FeeType();
  public feeTypes: FeeType[] = [];
  public feeTypeData = new Page<FeeType>();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public creating = false;

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("fee_type", "create");
    this.editable = authService.hasPermission("fee_type", "update");
    this.deletable = authService.hasPermission("fee_type", "delete");
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowEditFeeType(contactMethod: FeeType) {
    this.selectedData = contactMethod;
    this.editing = true;
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
          this.creating = false;
          this.editing = false;

          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}