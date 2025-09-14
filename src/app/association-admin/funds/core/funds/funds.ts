import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/core/transaction-balance-chart-widget/transaction-balance-chart-widget';
import { CalendarsModule } from '@app/shared/calendar/calendar.module';
import { Month } from '@app/shared/calendar/models/month';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { CalendarEvent } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TransactionCalendarService } from '../transaction-calendar-service/transaction-calendar-service';
import { FundsCurrentBalance } from '../transaction-current-balance/transaction-current-balance';
import { TransactionReportService } from '../transaction-report-service/transaction-report-service';

@Component({
  selector: 'app-funds',
  imports: [RouterModule, PanelModule, CardModule, ButtonModule, CalendarsModule, IconAddComponent, TransactionBalanceChartWidgetContainer, FundsCurrentBalance],
  templateUrl: './funds.html'
})
export class Funds {

  private readonly route = inject(ActivatedRoute);

  private readonly service = inject(TransactionCalendarService);

  private readonly router = inject(Router);

  private readonly reportService = inject(TransactionReportService);

  public months: Month[] = [];

  public month = this.getThisMonth();

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public readonly createable;

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  public loadingExcel = false;

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("transaction", "create");

    // Read range
    this.service.getRange().subscribe(months => {
      // To show in the selection box we have to reverse the order
      this.months = months;
      // TODO: What happens if this date is not in the range?
      if (!this.readingCalendar) {
        const date = new Date();
        if (this.months.length > 0) {
          const month = this.months[this.months.length - 1];
          if ((date.getFullYear() >= month.year) || ((date.getFullYear() >= month.year) && (date.getMonth() >= month.month))) {
            // The current date is after the last date in range
            // Replace with the last date
            this.month = month;
          } else {
            this.month = this.getThisMonth();
          }
        } else {
          this.month = this.getThisMonth();
        }

        this.load();
      }
    });
  }

  public onStartEditingView(view: string): void {
  }

  private load() {
    this.readingCalendar = true;
    this.service.getCalendar(this.month.year, this.month.month).subscribe({
      next: response => {
        this.events = response;
        // Reactivate view
        this.readingCalendar = false;
      },
      error: error => {
        // Reactivate view
        this.readingCalendar = false;
      }
    });
  }

  private getThisMonth() {
    const date = new Date();
    const month = new Month(date.getFullYear(), date.getMonth() + 1);

    return month;
  }

  public onChangeMonth(date: Month) {
    // Corrects month value
    this.month = date;
    this.load();
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    this.router.navigate([`transaction/${event.meta?.transactionId}`], { relativeTo: this.route });
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .subscribe({
        next: response => {
          this.loadingExcel = false;
        },
        error: error => {
          this.loadingExcel = false;
        }
      });
  }

}
