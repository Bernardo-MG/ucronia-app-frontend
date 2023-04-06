import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { MainFrameLayoutComponent } from './components/layout-main-frame/layout-main-frame.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountMenuComponent } from './containers/account-menu/account-menu.component';
import { AccountLayoutComponent } from './containers/layout-account/layout-account.component';
import { LayoutHeaderFrameComponent } from './containers/layout-header-frame/layout-header-frame.component';


@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MenuComponent,
    MainFrameLayoutComponent,
    AccountMenuComponent,
    NavbarComponent,
    AccountLayoutComponent,
    LayoutHeaderFrameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    PaginationModule,
    AuthenticationModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    FormControlsComponent,
    MainFrameLayoutComponent,
    NavbarComponent
  ],
})
export class LayoutModule { }
