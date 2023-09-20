import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { CalendarEvent } from 'angular-calendar';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';

@Component({
  selector: 'assoc-funds-calendar',
  templateUrl: './funds-calendar.component.html'
})
export class FundsCalendarComponent {

  public months: Date[] = [];

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
    this.calendarService.getRange().subscribe(d => {
      this.months = d;
      // TODO: What happens if this date is not in the range?
      if (!this.readingCalendar) {
        const date = new Date();
        this.load(date.getFullYear(), date.getMonth() + 1);
      }
    });
  }

  public onChangeMonth(date: Month) {
    // Corrects month value
    this.load(date.year, date.month);
  }

  public onPickDate(event: CalendarEvent<{ transactionId: number }>) {
    this.router.navigate([`/funds/${event.meta?.transactionId}`]);
  }

  private load(year: number, month: number) {
    this.readingCalendar = true;
    this.calendarService.getCalendar(year, month).subscribe({
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
              transactionId: t.id,
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

}