import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IconsModule } from '../icons/icons.module';
import { WaitingWrapperComponent } from '../layout/components/waiting-wrapper/waiting-wrapper.component';
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
    WaitingWrapperComponent,
    IconsModule
  ],
  exports: [
    CalendarMonthComponent
  ]
})
export class ScheduleModule { }
