import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from './buttons/buttons.module';
import { IconsModule } from './icons/icons.module';
import { PaginationModule } from './pagination/pagination.module';
import { CalendarModule } from './calendar/calendar.module';



@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule
  ],
  exports: [
    ButtonsModule,
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule
  ]
})
export class SharedModule { }
