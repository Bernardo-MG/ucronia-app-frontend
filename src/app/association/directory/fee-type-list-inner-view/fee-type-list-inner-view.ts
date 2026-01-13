import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { FeeType } from "@ucronia/domain";
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

  public selectedFeeTypeData = new FeeType();
  public feeTypes: FeeType[] = [];
  public feeTypeData = new PaginatedResponse<FeeType>();

  /**
   * Loading flag.
   */
  public loading = false;
  public editingFeeType = false;
  public creatingFeeType = false;

  public failures = new FailureStore();

  public selectedStatus: 'all' | 'member' | 'guest' | 'sponsor' = 'all';

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("profile", "create");
    this.editable = authService.hasPermission("profile", "update");
    this.deletable = authService.hasPermission("profile", "delete");
  }

  public ngOnInit(): void {
    this.loadFeeTypes(0);
  }

  // EVENT HANDLERS

  public onShowEditFeeType(contactMethod: FeeType) {
    this.selectedFeeTypeData = contactMethod;
    this.editingFeeType = true;
  }

  public onCreateFeeType(toCreate: FeeType): void {
    this.mutation(
      this.feeTypeService.create(toCreate),
      () => this.loadFeeTypes(0)
    );
  }

  public onUpdateFeeType(toUpdate: FeeType): void {
    this.mutation(
      this.feeTypeService.update(toUpdate),
      () => this.loadFeeTypes(this.feeTypeData.page)
    );
  }

  public onDeleteFeeType(number: number): void {
    this.mutation(
      this.feeTypeService.delete(number),
      () => this.loadFeeTypes(0)
    );
  }

  // DATA LOADING

  public loadFeeTypes(page: number): void {
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
        next: () => {
          this.failures.clear();
          this.creatingFeeType = false;
          this.editingFeeType = false;

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