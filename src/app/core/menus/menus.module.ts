import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountMenuComponent } from './containers/account-menu/account-menu.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    PaginationModule,
    AuthenticationModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class MenusModule { }
