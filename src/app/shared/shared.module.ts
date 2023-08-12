import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from './calendar/calendar.module';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layout/layout.module';
import { MenuModule } from './menu/menu.module';
import { PaginationModule } from './pagination/pagination.module';
import { FormModule } from './form/form.module';



@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule,
    LayoutModule,
    FormModule
  ],
  exports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    CalendarModule,
    MenuModule,
    LayoutModule,
    FormModule
  ]
})
export class SharedModule { }
