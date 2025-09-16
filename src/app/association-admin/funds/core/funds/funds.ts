import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionBalanceChartContainer } from '@app/association-admin/funds/core/transaction-balance-chart/transaction-balance-chart';
import { Transaction } from '@app/domain/transactions/transaction';
import { TransactionCurrentBalance } from '@app/domain/transactions/transaction-current-balance';
import { CalendarMonth } from '@app/shared/calendar/components/calendar-month/calendar-month';
import { Month } from '@app/shared/calendar/models/month';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { CalendarEvent } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service/transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service/transaction-calendar-service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { LibraryAdminBookInfo } from '../transaction-info/transaction-info';
import { TransactionReportService } from '../transaction-report-service/transaction-report-service';
import { TransactionService } from '../transaction-service/transaction-service';

@Component({
  selector: 'app-funds',
  imports: [RouterModule, PanelModule, CardModule, ButtonModule, DrawerModule, CalendarMonth, LibraryAdminBookInfo, TransactionForm, TransactionBalanceChartContainer, BlockUiDirective],
  templateUrl: './funds.html'
})
export class Funds {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly reportService = inject(TransactionReportService);

  public selectionMonths: Month[] = [];
  public month = this.getCurrentMonth();

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
    const transactionBalanceService = inject(TransactionBalanceService);

    // Check permissions
    this.createable = authContainer.hasPermission("transaction", "create");
    this.editable = authContainer.hasPermission("transaction", "update");

    // Read range
    this.transactionCalendarService.getRange().subscribe(months => {
      // To show in the selection box we have to reverse the order
      this.selectionMonths = months;
      // TODO: What happens if this date is not in the range?
      if (!this.loadingCalendar) {
        this.setInitialMonth();
        this.loadCalendar();
      }
    });

    // Read balance
    this.loadingBalance = true;
    transactionBalanceService.current()
      .pipe(finalize(() => this.loadingBalance = false))
      .subscribe(b => this.balance = b);
  }

  private setInitialMonth() {
    const date = new Date();
    if (this.selectionMonths.length > 0) {
      const month = this.selectionMonths[this.selectionMonths.length - 1];
      if ((date.getFullYear() >= month.year) || ((date.getFullYear() >= month.year) && (date.getMonth() >= month.month))) {
        // The current date is after the last date in range
        // Replace with the last date
        this.month = month;
      } else {
        this.month = this.getCurrentMonth();
      }
    } else {
      this.month = this.getCurrentMonth();
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
    action().subscribe({
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
        this.loading = false;
        return throwError(() => error);
      }
    });
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onChangeMonth(date: Month) {
    // Corrects month value
    this.month = date;
    this.loadCalendar();
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
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
    this.transactionCalendarService.getCalendar(this.month.year, this.month.month)
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(events => this.events = events);
  }

  private getCurrentMonth() {
    const now = new Date();
    return new Month(now.getFullYear(), now.getMonth() + 1);
  }

}
