import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from './calendar/calendar.module';
import { EditionModule } from './edition/edition.module';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layout/layout.module';
import { MenuModule } from './menu/menu.module';
import { PaginationModule } from './pagination/pagination.module';



@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule,
    LayoutModule,
    EditionModule
  ],
  exports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule,
    LayoutModule,
    EditionModule
  ]
})
export class SharedModule { }
