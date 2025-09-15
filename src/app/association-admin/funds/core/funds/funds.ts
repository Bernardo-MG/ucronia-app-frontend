import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/core/transaction-balance-chart-widget/transaction-balance-chart-widget';
import { TransactionCurrentBalance } from '@app/domain/transactions/transaction-current-balance';
import { CalendarsModule } from '@app/shared/calendar/calendar.module';
import { Month } from '@app/shared/calendar/models/month';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { CalendarEvent } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { finalize } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service/transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service/transaction-calendar-service';
import { TransactionReportService } from '../transaction-report-service/transaction-report-service';

@Component({
  selector: 'app-funds',
  imports: [RouterModule, PanelModule, CardModule, ButtonModule, CalendarsModule, IconAddComponent, TransactionBalanceChartWidgetContainer, BlockUiDirective],
  templateUrl: './funds.html'
})
export class Funds {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TransactionCalendarService);
  private readonly reportService = inject(TransactionReportService);

  public months: Month[] = [];
  public month = this.getCurrentMonth();

  public loadingCalendar = false;
  public loadingExcel = false;
  public loadingBalance = false;

  public readonly createable;

  public events: CalendarEvent<{ transactionId: number }>[] = [];
  public balance = new TransactionCurrentBalance();

  constructor() {
    const authContainer = inject(AuthContainer);
    const transactionBalanceService = inject(TransactionBalanceService);

    // Check permissions
    this.createable = authContainer.hasPermission("transaction", "create");

    // Read range
    this.service.getRange().subscribe(months => {
      // To show in the selection box we have to reverse the order
      this.months = months;
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
    if (this.months.length > 0) {
      const month = this.months[this.months.length - 1];
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

  public onStartEditingView(view: string): void {
  }

  public onChangeMonth(date: Month) {
    // Corrects month value
    this.month = date;
    this.loadCalendar();
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    this.router.navigate([`transaction/${event.meta?.transactionId}`], { relativeTo: this.route });
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(finalize(() => this.loadingExcel = false))
      .subscribe();
  }

  private loadCalendar() {
    this.loadingCalendar = true;
    this.service.getCalendar(this.month.year, this.month.month)
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(events => this.events = events);
  }

  private getCurrentMonth() {
    const now = new Date();
    return new Month(now.getFullYear(), now.getMonth() + 1);
  }

}
