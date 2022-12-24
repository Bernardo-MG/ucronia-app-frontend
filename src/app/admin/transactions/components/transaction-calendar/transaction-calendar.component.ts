import { Component, Input } from '@angular/core';
import { CalendarNote } from '@app/calendar/models/calendar-note';

@Component({
  selector: 'admin-transaction-calendar',
  templateUrl: './transaction-calendar.component.html',
  styleUrls: ['./transaction-calendar.component.sass']
})
export class TransactionCalendarComponent {
  
  public dates: CalendarNote[] = [];

  constructor() { 
    const info = new CalendarNote(2022,12,2,"text");
    this.dates.push(info);
  }

}
