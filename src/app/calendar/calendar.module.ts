import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';



@NgModule({
  declarations: [
    CalendarMonthComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarMonthComponent
  ]
})
export class CalendarModule { }
