import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityChangePasswordFormComponent } from './components/security-change-password-form/security-change-password-form.component';
import { SecurityChangePasswordService } from './service/security-change-password.service';
import { SecurityChangePasswordViewComponent } from './views/security-change-password-view/security-change-password-view.component';



@NgModule({
  declarations: [
    SecurityChangePasswordFormComponent,
    SecurityChangePasswordViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule,
    ApiUiModule
  ],
  providers: [
    SecurityChangePasswordService
  ]
})
export class PasswordModule { }
