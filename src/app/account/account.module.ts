import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/security/login/login.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountRoutingModule } from './account-routing.module';
import { AccountNavMenuComponent } from './components/account-nav-menu/account-nav-menu.component';
import { AccountSettingsViewComponent } from './views/account-settings-view/account-settings-view.component';



@NgModule({
  declarations: [
    AccountNavMenuComponent,
    AccountSettingsViewComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    LoginModule
  ],
  exports: [
    AccountNavMenuComponent
  ]
})
export class AccountModule { }
