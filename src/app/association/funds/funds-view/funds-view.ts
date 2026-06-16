import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { SummaryCard, TextFilter } from '@bernardo-mg/ui';
import { Transaction, TransactionSummary } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
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
  imports: [PanelModule, CardModule, ButtonModule, DrawerModule, TransactionCalendar, TransactionInfo, TransactionForm, TextFilter, TransactionDisplaySelector, TransactionList, TransactionBalanceChartView, SummaryCard],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);
  private readonly confirmationService = inject(ConfirmationService);

  public months: Date[] = [];

  public readonly status: Status = {
    loading: false,
    loadingCalendar: false,
    loadingList: false,
    loadingExcel: false,
    loadingSummary: false
  };
  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;
  public readonly Display = Display;

  public selectedData = new Transaction();

  public descriptionFilter = '';

  public transactions: Transaction[] = [];
  public transactionsPage = new Page<Transaction>();
  public summary = new TransactionSummary();

  public display = Display.CALENDAR;

  public failures = new FailureStore();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("transaction", "create"),
      edit: authService.hasPermission("transaction", "update"),
      delete: authService.hasPermission("transaction", "delete")
    };
  }

  public ngOnInit(): void {
    // Read range
    this.transactionCalendarService.getRange()
      .subscribe(months => {
        // To show in the selection box we have to reverse the order
        // TODO: months should start in 0
        this.months = months
          .map(m => new Date(m.year, m.month - 1));
        // TODO: then sort the months instead of reversing
        this.months = [...this.months].reverse();
        if (!this.status.loadingCalendar) {
          this.loadCalendar();
        }
        if (!this.status.loadingList) {
          this.loadList();
        }
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
      () => this.load()
    );
  }

  public onUpdate(toCreate: Transaction): void {
    this.call(
      () => this.service.update(toCreate),
      () => this.load()
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
      () => this.load()
      )
    });
  }

  public onShowInfo(transactionId: number) {
    this.service.getOne(transactionId)
      .subscribe(transaction => this.selectedData = transaction);
    this.dialog = Dialog.INFO;
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

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // DATA LOADING

  public loadCalendar(month: Date = this.getDefaultMonth()) {
    this.status.loadingCalendar = true;
    this.transactionCalendarService.getCalendarInRange(month.getFullYear(), month.getMonth())
      .pipe(finalize(() => this.status.loadingCalendar = false))
      .subscribe(transactions => this.transactions = transactions);
  }

  public loadList(page: number | undefined = undefined) {
    this.status.loadingList = true;
    this.service.getAll(page, this.descriptionFilter)
      .pipe(finalize(() => this.status.loadingList = false))
      .subscribe(transactions => this.transactionsPage = transactions);
  }

  private load() {
    if (this.display === Display.CALENDAR) {
      this.loadCalendar();
    } else {
      this.loadList();
    }
  }

  // PRIVATE METHODS

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

export enum Display {
  CALENDAR = 'calendar',
  LIST = 'list'
}