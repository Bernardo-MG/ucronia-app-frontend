import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarMonth } from './components/calendar-month/calendar-month';


@NgModule({
  declarations: [
    CalendarMonth
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
    CalendarMonth
  ]
})
export class CalendarsModule { }
