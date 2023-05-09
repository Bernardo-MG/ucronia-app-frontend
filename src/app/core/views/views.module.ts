import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountLayoutComponent } from './containers/account-layout/account-layout.component';
import { AccountMenuComponent } from './containers/account-menu/account-menu.component';
import { CenteredLayoutComponent } from './containers/centered-layout/centered-layout.component';
import { HeaderLayoutComponent } from './containers/header-layout/header-layout.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    AccountMenuComponent,
    NavbarComponent,
    AccountLayoutComponent,
    HeaderLayoutComponent,
    CenteredLayoutComponent
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
    MainLayoutComponent,
    CenteredLayoutComponent,
    NavbarComponent
  ],
})
export class ViewsModule { }
