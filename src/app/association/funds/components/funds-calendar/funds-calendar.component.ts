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

  public year = 0;

  public month = 0;

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
      if ((!this.readingCalendar) && (this.year === 0)) {
        this.load(new Date());
      }
    });
  }

  public onDateChange(date: Month) {
    // Corrects month value
    const formattedDate = (date.year + '-' + date.month);
    this.load(new Date(formattedDate));
  }

  public onPickTransaction(event: CalendarEvent<{ transactionId: number }>) {
    this.router.navigate([`/funds/${event.meta?.transactionId}`]);
  }

  private load(date: Date) {
    this.readingCalendar = true
    this.year = date.getFullYear();
    // Corrects month value
    this.month = date.getMonth() + 1;
    this.calendarService.getCalendar(this.year, this.month).subscribe({
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
