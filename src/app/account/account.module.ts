import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { MenuModule } from '@app/shared/menu/menu.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountService } from './services/account.service';



@NgModule({
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
