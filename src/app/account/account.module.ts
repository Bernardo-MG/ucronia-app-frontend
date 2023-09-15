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
import { AccountProfileViewComponent } from './components/account-profile/account-profile.component';
import { AccountService } from './services/account.service';
import { AccountPasswordChangeComponent } from './components/account-password-change/account-password-change.component';



@NgModule({
  declarations: [
    AccountProfileViewComponent,
    AccountPasswordChangeComponent,
    AccountChangePasswordFormComponent,
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
