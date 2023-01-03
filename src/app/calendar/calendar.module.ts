import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CalendarMonthComponent
  ]
})
export class CalendarModule { }
