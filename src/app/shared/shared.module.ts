import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { PaginationModule } from './pagination/pagination.module';
import { CalendarModule } from './calendar/calendar.module';



@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule
  ],
  exports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule
  ]
})
export class SharedModule { }
