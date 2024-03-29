import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePasswordFormComponent } from './components/account-change-password-form/account-change-password-form.component';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountPasswordChangeComponent } from './components/account-password-change/account-password-change.component';
import { AccountProfileViewComponent } from './components/account-profile/account-profile.component';
import { AccountService } from './services/account.service';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';



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
    ArticleComponent,
    WaitingButtonComponent,
    MenuModule
  ],
  providers: [
    AccountService,
    AccountLayoutComponent
  ]
})
export class AccountModule { }
