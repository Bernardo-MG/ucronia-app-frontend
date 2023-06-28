import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePasswordFormComponent } from './components/account-change-password-form/account-change-password-form.component';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountProfileViewComponent } from './components/account-profile-view/account-profile-view.component';
import { AccountSideMenuOptionsComponent } from './components/account-side-menu-options/account-side-menu-options.component';
import { AccountService } from './services/account.service';
import { AccountChangePasswordViewComponent } from './components/account-password-view/account-password-view.component';



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
    IconsModule,
    LayoutModule,
    MenuModule
  ],
  providers: [
    AccountService,
    AccountLayoutComponent
  ]
})
export class AccountModule { }
