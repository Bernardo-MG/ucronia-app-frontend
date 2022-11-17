import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePasswordFormComponent } from './components/account-change-password-form/account-change-password-form.component';
import { AccountNavMenuComponent } from './components/account-nav-menu/account-nav-menu.component';
import { AccountService } from './services/account.service';
import { AccountChangePasswordViewComponent } from './views/account-change-password-view/account-change-password-view.component';
import { AccountSettingsViewComponent } from './views/account-settings-view/account-settings-view.component';



@NgModule({
  declarations: [
    AccountNavMenuComponent,
    AccountSettingsViewComponent,
    AccountChangePasswordViewComponent,
    AccountChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoginModule
  ],
  exports: [
    AccountNavMenuComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
