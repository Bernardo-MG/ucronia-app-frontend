import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { CalendarEvent } from 'angular-calendar';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'assoc-transaction-calendar',
  standalone: true,
  imports: [ScheduleModule],
  templateUrl: './transaction-calendar.component.html'
})
export class TransactionCalendarComponent implements OnInit {

  public months: Month[] = [];

  public month = this.getThisMonth();

  /**
   * Loading flag.
   */
  public readingCalendar = false;

  public events: CalendarEvent<{ transactionId: number }>[] = [];

  constructor(
    private calendarService: TransactionCalendarService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    // Read range
    this.calendarService.getRange().subscribe(months => {
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

  public onChangeMonth(date: Month) {
    // Corrects month value
    this.month = date;
    this.load();
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    this.router.navigate([`/funds/transaction/${event.meta?.transactionId}`]);
  }

  private load() {
    this.readingCalendar = true;
    this.calendarService.getCalendar(this.month.year, this.month.month).subscribe({
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

}
