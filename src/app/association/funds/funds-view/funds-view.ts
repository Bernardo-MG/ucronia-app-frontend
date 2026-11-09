import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DetailRequest } from '@app/shared/request/detail-request';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { UcroniaPermissions } from '@ucronia/auth';
import { Transaction, TransactionSummary, TransactionType } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { finalize, Observable, Subject, Subscription } from 'rxjs';
import { FundsDisplay } from '../funds-display';
import { TransactionBalanceChartView } from '../transaction-balance-chart-view/transaction-balance-chart-view';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionCalendar } from '../transaction-calendar/transaction-calendar';
import { TransactionDisplaySelector } from '../transaction-display-selector/transaction-display-selector';
import { TransactionForm } from '../transaction-form/transaction-form';
import { TransactionInfo } from '../transaction-info/transaction-info';
import { TransactionList } from '../transaction-list/transaction-list';
import { TransactionReportService } from '../transaction-report-service';
import { TransactionService } from '../transaction-service';
import { TransactionTypeForm } from '../transaction-type-form/transaction-type-form';
import { TransactionTypeList } from '../transaction-type-list/transaction-type-list';

@Component({
  selector: 'app-funds-view',
  imports: [TabsModule, TransactionTypeList, TransactionTypeForm, DrawerHeader, DrawerFormActions, DrawerActions, CurrencyPipe, CardModule, ButtonModule, DrawerModule, SkeletonModule, TransactionCalendar, TransactionInfo, TransactionForm, TextFilter, TransactionDisplaySelector, TransactionList, TransactionBalanceChartView],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reportService = inject(TransactionReportService);
  private readonly service = inject(TransactionService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);

  public months: Date[] = [];
  public selectedData = new Transaction();
  public transactions: Transaction[] = [];

  protected deletingType = false;
  protected descriptionFilter = '';
  protected readonly Dialog = Dialog;
  protected get dialog(): Dialog {
    return this.currentDialog;
  }
  protected set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.currentDialog = value;
      this.typesRequest?.unsubscribe();
      if (this.permissions.readTypes && (value === Dialog.CREATE || value === Dialog.EDIT || value === Dialog.INFO)) {
        this.loadTransactionTypes();
      }
    }
  }
  protected display = FundsDisplay.CALENDAR;
  protected failures = new FailureStore();
  protected readonly FundsDisplay = FundsDisplay;
  protected readonly permissions: Permissions;
  protected selectedCalendarMonth?: Date;
  protected selectedTab: string | number = 'transactions';
  protected get selectedTransactionType(): TransactionType | undefined {
    return this.transactionTypes().find(type => type.number === this.selectedData.transactionType);
  }
  protected selectedType?: TransactionType;
  protected selectedTypeNumber?: number;
  protected showTypeEditForm = false;
  protected showTypeForm = false;
  protected readonly status: Status = {
    loading: false,
    loadingCalendar: false,
    loadingList: false,
    loadingExcel: false,
    errorExcel: false,
    loadingSummary: false
  };
  protected summary = new TransactionSummary();
  protected readonly transactionsChanged$ = new Subject<void>();
  protected transactionsPage = new Page<Transaction>();
  protected readonly transactionTypes = signal<TransactionType[]>([]);
  protected transactionTypesPage = new Page<TransactionType>();
  protected transactionTypesPageFailed = false;
  protected transactionTypesPageLoading = false;
  protected typeDeleteFailed = false;
  protected typeDetailsFailed = false;
  protected typeDetailsLoading = false;
  protected readonly typeFailures = signal(new FailureStore());
  protected readonly typeLoading = signal(false);
  protected readonly typeSaveError = signal(false);
  protected typesLoadFailed = false;
  protected readonly typesLoading = signal(false);

  private calendarRequest?: Subscription;
  private currentDialog = Dialog.NONE;
  private readonly detailRequest = new DetailRequest();
  private listRequest?: Subscription;
  private monthsRequest?: Subscription;
  private sort = new Sorting();
  private summaryRequest?: Subscription;
  private transactionTypesPageRequest?: Subscription;
  private typeDetailsRequest?: Subscription;
  private typesRequest?: Subscription;

  public constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      deleteTypes: authService.hasPermission(UcroniaPermissions.transactionType.delete),
      editTypes: authService.hasPermission(UcroniaPermissions.transactionType.update),
      readTypes: authService.hasPermission(UcroniaPermissions.transactionType.read),
      createType: authService.hasPermission(UcroniaPermissions.transactionType.create),
      create: authService.hasPermission(UcroniaPermissions.transaction.create),
      edit: authService.hasPermission(UcroniaPermissions.transaction.update),
      delete: authService.hasPermission(UcroniaPermissions.transaction.delete)
    };
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    if (this.permissions.readTypes) {
      this.loadTransactionTypes();
    }

    this.refreshMonths(() => {
      this.loadCalendar();
      this.loadList();
    });

    this.loadSummary();
  }

  // Event handlers
  protected closeTypeDetails(): void {
    if (this.deletingType) {
      return;
    }

    this.typeDetailsRequest?.unsubscribe();
    this.selectedTypeNumber = undefined;
    this.selectedType = undefined;
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  protected onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  protected onChangeDirection(sorting: SortingEvent): void {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort = new Sorting([new SortingProperty(sorting.field, direction)]);
    this.loadList();
  }

  public onCreate(toCreate: Transaction): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.refreshAfterChange()
    );
  }

  public onDelete(event: Event): void {
    const dialog = this.dialog;
    const index = this.selectedData.index;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (this.destroyRef.destroyed || this.dialog !== dialog || this.selectedData.index !== index) {
          return;
        }

        this.call(
          () => this.service.delete(index),
          () => this.refreshAfterChange()
        );
      }
    });
  }

  protected onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  protected onEditType(): void {
    this.showTypeEditForm = true;
  }

  protected onFilter(filter: string): void {
    this.descriptionFilter = filter;
    this.loadList();
  }

  protected onShowInfo(transactionId: number): void {
    this.detailRequest.cancel();
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.getOne(transactionId)
      .pipe(
        finalize(() => this.status.loading = false),
        this.detailRequest.untilCancelled(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(transaction => this.selectedData = transaction);
  }

  protected onTabChange(tab: string | number | undefined): void {
    if (tab === undefined || tab === this.selectedTab) {
      return;
    }

    this.selectedTab = tab;
    if (tab === 'transactions' && this.permissions.readTypes) {
      this.transactionTypesPageRequest?.unsubscribe();
      this.transactionTypesPageLoading = false;
      this.loadTransactionTypes();
    } else if (tab === 'types' && this.permissions.readTypes) {
      this.loadTransactionTypePage(1);
    }
  }

  protected onTypeDetailsVisibleChange(visible: boolean): void {
    if (!visible) {
      this.closeTypeDetails();
    }
  }

  protected onTypePageChange(page: number): void {
    this.loadTransactionTypePage(page);
  }

  public onUpdate(toUpdate: Transaction): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.refreshAfterChange()
    );
  }

  // Data loading
  private load(): void {
    if (this.display === FundsDisplay.CALENDAR) {
      this.loadCalendar();
    } else {
      this.loadList();
    }
  }

  public loadCalendar(month?: Date): void {
    const selectedMonth = month ?? this.selectedCalendarMonth ?? this.months.at(-1) ?? new Date();
    this.selectedCalendarMonth = selectedMonth;

    this.calendarRequest?.unsubscribe();
    this.status.loadingCalendar = true;
    this.calendarRequest = this.transactionCalendarService
      .getCalendarInRange(selectedMonth.getFullYear(), selectedMonth.getMonth())
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.status.loadingCalendar = false))
      .subscribe(transactions => this.transactions = transactions);
  }

  protected loadList(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.status.loadingList = true;
    this.listRequest = this.service.getAll(page, this.descriptionFilter, this.sort)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loadingList = false)
      )
      .subscribe(transactions => this.transactionsPage = transactions);
  }

  private loadSummary(): void {
    this.summaryRequest?.unsubscribe();
    this.status.loadingSummary = true;
    this.summaryRequest = this.transactionBalanceService.summary()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.status.loadingSummary = false))
      .subscribe(s => this.summary = s);
  }

  protected loadTransactionTypePage(page = this.transactionTypesPage.page || 1): void {
    this.transactionTypesPageRequest?.unsubscribe();
    this.transactionTypesPageLoading = true;
    this.transactionTypesPageFailed = false;

    const request = new Subscription();
    this.transactionTypesPageRequest = request;
    request.add(this.service.getTypesPage(page, 10)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          if (data.content.length === 0 && page > 1) {
            this.loadTransactionTypePage(Math.max(1, Math.min(page - 1, data.totalPages)));
            return;
          }

          this.transactionTypesPage = data;
          this.transactionTypesPageLoading = false;
        },
        error: () => {
          this.transactionTypesPageLoading = false;
          this.transactionTypesPageFailed = true;
        }
      }));
  }

  private loadTransactionTypes(): void {
    this.typesRequest?.unsubscribe();
    this.typesLoading.set(true);
    this.typesLoadFailed = false;
    this.typesRequest = this.service.getTypes()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.typesLoading.set(false)))
      .subscribe({
        next: types => this.transactionTypes.set(types),
        error: () => {
          this.transactionTypes.set([]);
          this.typesLoadFailed = true;
        }
      });
  }

  private refreshAfterChange(): void {
    this.refreshMonths(() => this.load());
    this.loadSummary();
    this.transactionsChanged$.next();
  }

  private refreshMonths(onSuccess: () => void): void {
    this.monthsRequest?.unsubscribe();
    this.monthsRequest = this.transactionCalendarService.getRange()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(months => {
        this.months = months.map(m => new Date(m.year, m.month - 1));

        if (!this.selectedCalendarMonth || !this.months.some(m =>
          m.getFullYear() === this.selectedCalendarMonth!.getFullYear() &&
          m.getMonth() === this.selectedCalendarMonth!.getMonth())) {
          this.selectedCalendarMonth = this.months.at(-1) ?? new Date();
        }

        onSuccess();
      });
  }

  // Protected methods
  protected closeTypeEditForm(): void {
    this.showTypeEditForm = false;
    this.typeFailures.set(new FailureStore());
    this.typeSaveError.set(false);
  }

  protected closeTypeForm(): void {
    this.showTypeForm = false;
    this.typeFailures.set(new FailureStore());
    this.typeSaveError.set(false);
  }

  protected confirmDeleteType(event: Event): void {
    const type = this.selectedType;
    if (!type || !this.permissions.deleteTypes || this.deletingType) {
      return;
    }

    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar este tipo de transacción?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (this.destroyRef.destroyed || this.selectedType !== type || this.showTypeEditForm || this.deletingType) {
          return;
        }

        this.deletingType = true;
        this.typeDeleteFailed = false;
        this.service.deleteType(type.number)
          .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.deletingType = false))
          .subscribe({
            next: () => {
              this.deletingType = false;
              this.closeTypeDetails();
              this.loadTransactionTypePage();
            },
            error: () => this.typeDeleteFailed = true
          });
      }
    });
  }

  protected createType(values: Pick<TransactionType, 'description' | 'color'>): void {
    if (this.typeLoading()) {
      return;
    }

    this.typeLoading.set(true);
    this.typeFailures.set(new FailureStore());
    this.typeSaveError.set(false);
    this.service.saveType(values)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.typeLoading.set(false)))
      .subscribe({
        next: () => {
          this.closeTypeForm();
          this.loadTransactionTypePage();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.typeFailures.set(error.failures);
          }
          this.typeSaveError.set(true);
        }
      });
  }

  protected downloadExcel(): void {
    this.status.loadingExcel = true;
    this.status.errorExcel = false;
    this.reportService.downloadExcelReport()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.status.loadingExcel = false))
      .subscribe({
        error: () => this.status.errorExcel = true
      });
  }

  protected showTypeDetails(number: number): void {
    this.typeDetailsRequest?.unsubscribe();
    this.selectedTypeNumber = number;
    this.selectedType = undefined;
    this.typeDetailsLoading = true;
    this.typeDetailsFailed = false;
    this.typeDeleteFailed = false;

    this.typeDetailsRequest = this.service.getType(number)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.typeDetailsLoading = false))
      .subscribe({
        next: type => this.selectedType = type,
        error: () => this.typeDetailsFailed = true
      });
  }

  protected updateType(values: Pick<TransactionType, 'description' | 'color'>, number: number): void {
    if (this.typeLoading()) {
      return;
    }

    this.typeLoading.set(true);
    this.typeFailures.set(new FailureStore());
    this.typeSaveError.set(false);
    this.service.saveType(values, number)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.typeLoading.set(false)))
      .subscribe({
        next: type => {
          this.selectedType = type;
          this.closeTypeEditForm();
          this.loadTransactionTypePage();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.typeFailures.set(error.failures);
          }
          this.typeSaveError.set(true);
        }
      });
  }

  // Private methods
  private call(
    action: () => Observable<unknown>,
    onSuccess: () => void
  ): void {
    this.status.loading = true;
    action()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
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

}

interface Permissions {
  deleteTypes: boolean;
  editTypes: boolean;
  readTypes: boolean;
  createType: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
  loadingCalendar: boolean;
  loadingList: boolean;
  loadingExcel: boolean;
  errorExcel: boolean;
  loadingSummary: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
