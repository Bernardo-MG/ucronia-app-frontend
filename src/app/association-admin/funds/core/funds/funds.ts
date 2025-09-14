import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/chart/containers/transaction-balance-chart-widget/transaction-balance-chart-widget.container';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { CalendarsModule } from '@app/shared/calendar/calendar.module';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { CalendarEvent } from 'angular-calendar';
import { CardModule } from 'primeng/card';
import { FundsCurrentBalanceWidgetContainer } from '../../balance/containers/transaction-current-balance-widget/transaction-current-balance-widget.container';
import { TransactionCalendarService } from '../transaction-calendar-service/transaction-calendar-service';

@Component({
  selector: 'app-funds',
  imports: [RouterModule, CardModule, CalendarsModule, IconAddComponent, TransactionBalanceChartWidgetContainer, FundsCurrentBalanceWidgetContainer, TransactionReportWidgetContainer],
  templateUrl: './funds.html'
})
export class Funds {

  private readonly route = inject(ActivatedRoute);

  private readonly service = inject(TransactionCalendarService);

  private readonly router = inject(Router);

  public months: Month[] = [];

  public month = this.getThisMonth();

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public readonly createPermission;

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("transaction", "create");

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

  private load() {
    this.readingCalendar = true;
    this.service.getCalendar(this.month.year, this.month.month).subscribe({
      next: response => {
        this.events = response.map(t => {
          const date = new Date(t.date);
          let color;
          if (t.amount >= 0) {
            color = Colors.blue;
          } else {
            color = Colors.red;
          }
          return {
            title: `${t.description} (${t.amount}€)`,
            color: color,
            start: date,
            meta: {
              transactionId: t.index,
            }
          };
        });
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

}
