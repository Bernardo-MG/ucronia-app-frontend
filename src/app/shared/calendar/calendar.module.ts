import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';


@NgModule({
  declarations: [
    CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BlockUiDirective,
    JustifyCenterDirective
  ],
  exports: [
    CalendarMonthComponent
  ]
})
export class CalendarsModule { }
