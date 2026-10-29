import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { finalize, Observable, Subscription } from 'rxjs';
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

@Component({
  selector: 'app-funds-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, CurrencyPipe, CardModule, ButtonModule, DrawerModule, SkeletonModule, TransactionCalendar, TransactionInfo, TransactionForm, TextFilter, TransactionDisplaySelector, TransactionList, TransactionBalanceChartView],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  public months: Date[] = [];
  private selectedCalendarMonth?: Date;
  private calendarRequest?: Subscription;

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

  public selectedData = new Transaction();

  public descriptionFilter = '';

  public transactions: Transaction[] = [];
  public transactionsPage = new Page<Transaction>();
  public summary = new TransactionSummary();

  public display = FundsDisplay.CALENDAR;

  public failures = new FailureStore();

  private sort = new Sorting();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
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

    // Read summary
    this.status.loadingSummary = true;
    this.transactionBalanceService.summary()
      .pipe(finalize(() => this.status.loadingSummary = false))
      .subscribe(s => this.summary = s);
  }

  // EVENT HANDLERS

  public onCreate(toCreate: Transaction): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.refreshMonths(() => this.load())
    );
  }

  public onUpdate(toUpdate: Transaction): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.refreshMonths(() => this.load())
    );
  }

  public onDelete(event: Event) {
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
        () => this.service.delete(this.selectedData.index),
        () => this.refreshMonths(() => this.load())
      )
    });
  }

  public onShowInfo(transactionId: number) {
    this.service.getOne(transactionId)
      .subscribe(transaction => this.selectedData = transaction);
    this.dialog = Dialog.INFO;
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
    const selectedMonth = month ?? this.selectedCalendarMonth ?? this.getDefaultMonth();
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
    this.status.loadingList = true;
    this.service.getAll(page, this.descriptionFilter, this.sort)
      .pipe(finalize(() => this.status.loadingList = false))
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

  private refreshMonths(onSuccess: () => void): void {
    this.transactionCalendarService.getRange()
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

  private getDefaultMonth() {
    let month;
    if (this.months.length) {
      month = this.months[0];
    } else {
      month = new Date();
    }
    return month
  }

}

interface Permissions {
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
