import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonDeleteComponent } from '../shared/buttons/components/button-delete/button-delete.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssociationLayoutComponent } from './containers/association-layout/association-layout.component';



@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonDeleteComponent,
    CalendarMonthComponent,
    AccountMenuComponent
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
    PaginationModule
  ],
  exports: [
    MenuComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonDeleteComponent,
    CalendarMonthComponent
  ]
})
export class CoreModule { }
