import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { SummaryCard, TextFilter } from '@bernardo-mg/ui';
import { Transaction, TransactionSummary } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
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
  imports: [PanelModule, CardModule, ButtonModule, DialogModule, TransactionCalendar, TransactionInfo, TransactionForm, TextFilter, TransactionDisplaySelector, TransactionList, TransactionBalanceChartView, SummaryCard],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  public months: Date[] = [];

  public loading = false;
  public loadingCalendar = false;
  public loadingList = false;
  public loadingExcel = false;
  public loadingSummary = false;
  public editing = false;
  public showing = false;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public selectedData = new Transaction();

  public descriptionFilter = '';

  public transactions: Transaction[] = [];
  public transactionsPage = new Page<Transaction>();
  public summary = new TransactionSummary();

  public view: string = '';
  public selectedView: 'calendar' | 'list' = 'calendar';

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("transaction", "create");
    this.editable = authService.hasPermission("transaction", "update");
    this.deletable = authService.hasPermission("transaction", "delete");
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
        if (!this.loadingCalendar) {
          this.loadCalendar();
        }
        if (!this.loadingList) {
          this.loadList();
        }
      });

    // Read summary
    this.loadingSummary = true;
    this.transactionBalanceService.summary()
      .pipe(finalize(() => this.loadingSummary = false))
      .subscribe(s => this.summary = s);
  }

  public onCreate(toCreate: Transaction): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onUpdate(toCreate: Transaction): void {
    this.call(
      () => this.service.update(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onDelete(event: Event, transaction: Transaction) {
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
        () => this.service.delete(transaction.index),
        () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 }))
    });
  }

  public onStartView(view: string): void {
    this.view = view;
    this.showing = false;
    this.editing = true;
  }

  public onShowInfo(transactionId: number) {
    this.service.getOne(transactionId)
      .subscribe(transaction => this.selectedData = transaction);
    this.showing = true;
  }

  public onFilter(filter: string) {
    this.descriptionFilter = filter;
    this.loadList();
  }

  public onViewChange(view: 'calendar' | 'list') {
    this.selectedView = view;
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(finalize(() => this.loadingExcel = false))
      .subscribe();
  }

  public loadCalendar(month: Date = this.getDefaultMonth()) {
    this.loadingCalendar = true;
    this.transactionCalendarService.getCalendarInRange(month.getFullYear(), month.getMonth())
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(transactions => this.transactions = transactions);
  }

  public loadList(page: number = 0) {
    this.loadingList = true;
    this.service.getAll(page, this.descriptionFilter)
      .pipe(finalize(() => this.loadingList = false))
      .subscribe(transactions => this.transactionsPage = transactions);
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

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.view = 'none';
          this.showing = false;
          this.loadCalendar();
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
