import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePasswordFormComponent } from './components/account-change-password-form/account-change-password-form.component';
import { AccountSideMenuOptionsComponent } from './components/account-side-menu-options/account-side-menu-options.component';
import { AccountChangePasswordViewComponent } from './containers/account-password-view/account-password-view.component';
import { AccountProfileViewComponent } from './containers/account-profile-view/account-profile-view.component';
import { AccountLayoutComponent } from './layout/account-layout/account-layout.component';
import { AccountService } from './services/account.service';



@NgModule({
  declarations: [
    AccountProfileViewComponent,
    AccountChangePasswordViewComponent,
    AccountChangePasswordFormComponent,
    AccountSideMenuOptionsComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    IconsModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
