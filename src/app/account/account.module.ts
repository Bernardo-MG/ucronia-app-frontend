import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePasswordFormComponent } from './components/account-change-password-form/account-change-password-form.component';
import { AccountNavMenuComponent } from './components/account-nav-menu/account-nav-menu.component';
import { AccountSideMenuComponent } from './components/account-side-menu/account-side-menu.component';
import { AccountLayoutComponent } from './layout/account-layout/account-layout.component';
import { AccountService } from './services/account.service';
import { AccountChangePasswordViewComponent } from './views/account-password-view/account-password-view.component';
import { AccountProfileViewComponent } from './views/account-profile-view/account-profile-view.component';



@NgModule({
  declarations: [
    AccountNavMenuComponent,
    AccountProfileViewComponent,
    AccountChangePasswordViewComponent,
    AccountChangePasswordFormComponent,
    AccountSideMenuComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoginModule,
    ControlsModule
  ],
  exports: [
    AccountNavMenuComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
