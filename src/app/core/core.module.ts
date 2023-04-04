import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from './authentication/authentication.module';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { DataFormComponent } from './layout/components/data-form/data-form.component';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [
    CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    AuthenticationModule,
    IconsModule,
    PaginationModule,
    LayoutModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    CalendarMonthComponent,
    LayoutModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
