import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';



@NgModule({
  declarations: [
    CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports: [
    CalendarMonthComponent
  ]
})
export class CalendarModule { }
