import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { Transaction, TransactionSummary } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonModule } from 'primeng/skeleton';
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
import { TabsModule } from 'primeng/tabs';
import { TransactionTypeList } from '../transaction-type-list/transaction-type-list';
import { TransactionTypeForm } from '../transaction-type-form/transaction-type-form';
import { TransactionService } from '../transaction-service';

@Component({
  selector: 'app-funds-view',
  imports: [TabsModule, TransactionTypeList, TransactionTypeForm, DrawerHeader, DrawerFormActions, DrawerActions, CurrencyPipe, CardModule, ButtonModule, DrawerModule, SkeletonModule, TransactionCalendar, TransactionInfo, TransactionForm, TextFilter, TransactionDisplaySelector, TransactionList, TransactionBalanceChartView],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly detailRequest = new DetailRequest();

  private readonly service = inject(TransactionService);
  private listRequest?: Subscription;
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  public months: Date[] = [];
  public selectedCalendarMonth?: Date;
  private calendarRequest?: Subscription;
  private monthsRequest?: Subscription;
  private summaryRequest?: Subscription;

  public readonly status: Status = {
    loading: false,
    loadingCalendar: false,
    loadingList: false,
    loadingExcel: false,
    loadingSummary: false
  };
  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;
  public readonly FundsDisplay = FundsDisplay;

  public selectedTab: string | number = 'transactions';
  public transactionTypesVersion = 0;
  public showTypeForm = false;

  public selectedData = new Transaction();

  public descriptionFilter = '';

  public transactions: Transaction[] = [];
  public transactionsPage = new Page<Transaction>();
  public summary = new TransactionSummary();
  public readonly transactionsChanged$ = new Subject<void>();

  public display = FundsDisplay.CALENDAR;

  public failures = new FailureStore();

  private sort = new Sorting();

  private currentDialog = Dialog.NONE;

  public get dialog(): Dialog {
    return this.currentDialog;
  }

  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.currentDialog = value;
    }
  }

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      readTypes: authService.hasPermission(UcroniaPermissions.transactionType.read),
      createType: authService.hasPermission(UcroniaPermissions.transactionType.create),
      create: authService.hasPermission(UcroniaPermissions.transaction.create),
      edit: authService.hasPermission(UcroniaPermissions.transaction.update),
      delete: authService.hasPermission(UcroniaPermissions.transaction.delete)
    };
  }

  public ngOnInit(): void {
    this.refreshMonths(() => {
      this.loadCalendar();
      this.loadList();
    });

    this.loadSummary();
  }

  // EVENT HANDLERS

  public onCreate(toCreate: Transaction): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.refreshAfterChange()
    );
  }

  public onUpdate(toUpdate: Transaction): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.refreshAfterChange()
    );
  }

  public onDelete(event: Event) {
    const dialog = this.dialog;
    const index = this.selectedData.index;
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
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.index !== index
        ) {
          return;
        }

        this.call(
          () => this.service.delete(index),
          () => this.refreshAfterChange()
        );
      }
    });
  }

  public onShowInfo(transactionId: number) {
    this.detailRequest.cancel();
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.getOne(transactionId)
      .pipe(
        finalize(() => this.status.loading = false),
        this.detailRequest.untilCancelled()
      )
      .subscribe(transaction => this.selectedData = transaction);
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort = new Sorting([new SortingProperty(sorting.field, direction)]);
    this.loadList();
  }

  public onFilter(filter: string) {
    this.descriptionFilter = filter;
    this.loadList();
  }

  // REPORT

  public downloadExcel() {
    this.status.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(finalize(() => this.status.loadingExcel = false))
      .subscribe();
  }

  // DIALOGS

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  // DATA LOADING

  public loadCalendar(month?: Date): void {
    const selectedMonth = month ?? this.selectedCalendarMonth ?? this.months.at(-1) ?? new Date();
    this.selectedCalendarMonth = selectedMonth;

    // Prevent an older month's response from replacing the current month's events.
    this.calendarRequest?.unsubscribe();
    this.status.loadingCalendar = true;
    this.calendarRequest = this.transactionCalendarService
      .getCalendarInRange(selectedMonth.getFullYear(), selectedMonth.getMonth())
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.status.loadingCalendar = false))
      .subscribe(transactions => this.transactions = transactions);
  }

  public loadList(page: number | undefined = undefined) {
    this.listRequest?.unsubscribe();
    this.status.loadingList = true;
    this.listRequest = this.service.getAll(page, this.descriptionFilter, this.sort)
      .pipe(finalize(() => this.status.loadingList = false))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(transactions => this.transactionsPage = transactions);
  }

  private load() {
    if (this.display === FundsDisplay.CALENDAR) {
      this.loadCalendar();
    } else {
      this.loadList();
    }
  }

  // PRIVATE METHODS

  private refreshAfterChange(): void {
    this.refreshMonths(() => this.load());
    this.loadSummary();
    this.transactionsChanged$.next();
  }

  private loadSummary(): void {
    this.summaryRequest?.unsubscribe();
    this.status.loadingSummary = true;
    this.summaryRequest = this.transactionBalanceService.summary()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.status.loadingSummary = false))
      .subscribe(s => this.summary = s);
  }

  private refreshMonths(onSuccess: () => void): void {
    this.monthsRequest?.unsubscribe();
    this.monthsRequest = this.transactionCalendarService.getRange()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(months => {
        // The backend returns months in ascending chronological order.
        this.months = months.map(m => new Date(m.year, m.month - 1));

        // Keep the displayed month if it is still available; otherwise
        // select the newest available month (or today when there are none).
        if (!this.selectedCalendarMonth || !this.months.some(m =>
          m.getFullYear() === this.selectedCalendarMonth!.getFullYear() &&
          m.getMonth() === this.selectedCalendarMonth!.getMonth())) {
          this.selectedCalendarMonth = this.months.at(-1) ?? new Date();
        }

        onSuccess();
      });
  }

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
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
  loadingSummary: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
