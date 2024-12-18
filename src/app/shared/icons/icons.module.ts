import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconAccountComponent } from './components/icon-account/icon-account.component';
import { IconAddComponent } from './components/icon-add/icon-add.component';
import { BackwardIconComponent } from './components/icon-backward/icon-backward.component';
import { IconBookComponent } from './components/icon-book/icon-book.component';
import { IconCalendarComponent } from './components/icon-calendar/icon-calendar.component';
import { IconCoinsComponent } from './components/icon-coins/icon-coins.component';
import { IconCreateComponent } from './components/icon-create/icon-create.component';
import { DeleteIconComponent } from './components/icon-delete/icon-delete.component';
import { IconEditComponent } from './components/icon-edit/icon-edit.component';
import { IconExcelComponent } from './components/icon-excel/icon-excel.component';
import { IconFailureComponent } from './components/icon-failure/icon-failure.component';
import { FastBackwardIconComponent } from './components/icon-fast-backward/icon-fast-backward.component';
import { FastForwardIconComponent } from './components/icon-fast-forward/icon-fast-forward.component';
import { ForwardIconComponent } from './components/icon-forward/icon-forward.component';
import { LoginIconComponent } from './components/icon-login/icon-login.component';
import { LogoutIconComponent } from './components/icon-logout/icon-logout.component';
import { IconMailComponent } from './components/icon-mail/icon-mail.component';
import { IconPersonComponent } from './components/icon-person/icon-person.component';
import { IconReceiptComponent } from './components/icon-receipt/icon-receipt.component';
import { IconSaveComponent } from './components/icon-save/icon-save.component';
import { IconSearchComponent } from './components/icon-search/icon-search.component';
import { IconSettingsComponent } from './components/icon-settings/icon-settings.component';
import { IconShieldComponent } from './components/icon-shield/icon-shield.component';
import { IconSuccessOrFailureComponent } from './components/icon-success-or-failure/icon-success-or-failure.component';
import { IconSuccessComponent } from './components/icon-success/icon-success.component';
import { IconTakeInComponent } from './components/icon-take-in/icon-take-in.component';
import { IconTakeOutComponent } from './components/icon-take-out/icon-take-out.component';
import { IconWaitingComponent } from './components/icon-waiting/icon-waiting.component';



@NgModule({
  declarations: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    LoginIconComponent,
    IconWaitingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent,
    IconSettingsComponent,
    IconAccountComponent,
    IconSaveComponent,
    IconAddComponent,
    IconSuccessComponent,
    IconFailureComponent,
    IconPersonComponent,
    IconCoinsComponent,
    IconReceiptComponent,
    IconBookComponent,
    IconShieldComponent,
    IconCalendarComponent,
    IconMailComponent,
    IconTakeInComponent,
    IconTakeOutComponent,
    IconSuccessOrFailureComponent,
    IconExcelComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    LoginIconComponent,
    IconWaitingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent,
    IconSettingsComponent,
    IconAccountComponent,
    IconSaveComponent,
    IconAddComponent,
    IconSuccessComponent,
    IconFailureComponent,
    IconPersonComponent,
    IconCoinsComponent,
    IconReceiptComponent,
    IconBookComponent,
    IconShieldComponent,
    IconCalendarComponent,
    IconMailComponent,
    IconTakeInComponent,
    IconTakeOutComponent,
    IconSuccessOrFailureComponent,
    IconExcelComponent
  ]
})
export class IconsModule { }
