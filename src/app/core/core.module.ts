import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { ButtonBackwardComponent } from './components/button-backward/button-backward.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonForwardComponent } from './components/button-forward/button-forward.component';
import { ButtonLinkCreateComponent } from './components/button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './components/button-link-edit/button-link-edit.component';
import { ButtonSearchSecondaryComponent } from './components/button-search-secondary/button-search-secondary.component';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { CueLoadingComponent } from './components/cue-waiting/cue-waiting.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderButtonTemplateComponent } from './components/order-button-template/order-button-template.component';
import { PaginationNavigationTemplateComponent } from './components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';
import { AssociationLayoutComponent } from './containers/association-layout/association-layout.component';
import { LoginViewComponent } from './containers/login-view/login-view.component';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';
import { OrderButtonComponent } from './containers/order-button/order-button.component';
import { PaginationNavigationComponent } from './containers/pagination-navigation/pagination-navigation.component';
import { PaginationSizeSelectorComponent } from './containers/pagination-size-selector/pagination-size-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
    AccountMenuComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonLinkEditComponent,
    ButtonLinkCreateComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent,
    LogoutButtonComponent,
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    PaginationNavigationComponent,
    OrderButtonComponent,
    PaginationSizeSelectorComponent,
    CalendarMonthComponent,
    LoginFormComponent,
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent,
    LogoutButtonComponent,
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    PaginationNavigationComponent,
    OrderButtonComponent,
    PaginationSizeSelectorComponent,
    CalendarMonthComponent,
    LoginViewComponent
  ]
})
export class CoreModule { }
