import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';
import { PaginationModule } from './pagination/pagination.module';
import { CalendarModule } from './calendar/calendar.module';
import { MenuModule } from './menu/menu.module';



@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule
  ],
  exports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule
  ]
})
export class SharedModule { }
