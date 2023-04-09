import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';
import { AccountLayoutComponent } from './containers/account-layout/account-layout.component';
import { AccountMenuComponent } from './containers/account-menu/account-menu.component';
import { HeaderLayoutComponent } from './containers/header-layout/header-layout.component';


@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    MainLayoutComponent,
    AccountMenuComponent,
    NavbarComponent,
    AccountLayoutComponent,
    HeaderLayoutComponent,
    WaitingWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    PaginationModule,
    AuthenticationModule,
    MenuModule
  ],
  exports: [
    DataFormComponent,
    DataListComponent,
    MainLayoutComponent,
    NavbarComponent,
    WaitingWrapperComponent
  ],
})
export class LayoutModule { }
