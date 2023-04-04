import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssociationLayoutComponent } from './containers/association-layout/association-layout.component';



@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MenuComponent,
    AssociationLayoutComponent,
    AccountMenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    PaginationModule,
    ButtonsModule,
    AuthenticationModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    AssociationLayoutComponent,
    NavbarComponent
  ],
})
export class LayoutModule { }
