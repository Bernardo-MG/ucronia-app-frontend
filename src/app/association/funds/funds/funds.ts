import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transaction } from '@app/domain/transactions/transaction';
import { TransactionCurrentBalance } from '@app/domain/transactions/transaction-current-balance';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { CalendarMonth } from '@bernardo-mg/ui';
import { CalendarEvent } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { TransactionBalanceChartContainer } from '../transaction-balance-chart/transaction-balance-chart';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { LibraryBookInfo } from '../transaction-info/transaction-info';
import { TransactionReportService } from '../transaction-report-service';
import { TransactionService } from '../transaction-service';

@Component({
  selector: 'app-funds',
  imports: [RouterModule, PanelModule, CardModule, ButtonModule, DialogModule, CalendarMonth, LibraryBookInfo, TransactionForm, TransactionBalanceChartContainer],
  templateUrl: './funds.html'
})
export class Funds implements OnInit {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);

  public months: Date[] = [];
  public month = new Date();

  public loading = false;
  public loadingCalendar = false;
  public loadingExcel = false;
  public loadingBalance = false;
  public editing = false;
  public showing = false;

  public readonly createable;
  public readonly editable;

  public selectedData = new Transaction();

  public events: CalendarEvent<{ transactionId: number }>[] = [];
  public balance = new TransactionCurrentBalance();

  public view: string = '';

  public failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("transaction", "create");
    this.editable = authContainer.hasPermission("transaction", "update");
  }

  public ngOnInit(): void {
    // Read range
    this.transactionCalendarService.getRange()
      .subscribe(months => {
        // To show in the selection box we have to reverse the order
        this.months = months
          .map(m => new Date(`${m.year}-${m.month}`));
        // TODO: What happens if this date is not in the range?
        if (!this.loadingCalendar) {
          this.setInitialMonth();
          this.loadCalendar();
        }
      });

    // Read balance
    this.loadingBalance = true;
    this.transactionBalanceService.current()
      .pipe(finalize(() => this.loadingBalance = false))
      .subscribe(b => this.balance = b);
  }

  private setInitialMonth() {
    const date = new Date();
    if (this.months.length > 0) {
      const month = this.months[this.months.length - 1];
      if ((date.getFullYear() >= month.getFullYear()) || ((date.getFullYear() >= month.getFullYear()) && (date.getMonth() >= month.getMonth()))) {
        // The current date is after the last date in range
        // Replace with the last date
        this.month = month;
      } else {
        this.month = new Date();
      }
    } else {
      this.month = new Date();
    }
  }

  public onCreate(toCreate: Transaction): void {
    this.mutate(() => this.service.create(toCreate));
  }

  public onUpdate(toCreate: Transaction): void {
    this.mutate(() => this.service.update(toCreate));
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.loadCalendar();
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

  public onStartEditingView(view: string): void {
    this.view = view;
    this.showing = false;
    this.editing = true;
  }

  public onChangeMonth(date: Date) {
    // Corrects month value
    this.month = date;
    this.loadCalendar();
  }

  public onShowInfo(event: CalendarEvent<{ transactionId: number }>) {
    if (event.meta) {
      this.service.getOne(event.meta.transactionId)
        .subscribe(transaction => this.selectedData = transaction);
      this.showing = true;
    }
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(finalize(() => this.loadingExcel = false))
      .subscribe();
  }

  private loadCalendar() {
    this.loadingCalendar = true;
    this.transactionCalendarService.getCalendar(this.month.getFullYear(), this.month.getMonth())
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(events => this.events = events);
  }

}
