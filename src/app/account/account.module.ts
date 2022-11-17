import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountNavMenuComponent } from './components/account-nav-menu/account-nav-menu.component';



@NgModule({
  declarations: [
    AccountNavMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LoginModule
  ],
  exports: [
    AccountNavMenuComponent
  ]
})
export class AccountModule { }
