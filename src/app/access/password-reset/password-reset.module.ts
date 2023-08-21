import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { PasswordResetRequestFormComponent } from './components/password-reset-request-form/password-reset-request-form.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetService } from './services/password-reset.service';



@NgModule({
  declarations: [
    PasswordResetRequestComponent,
    PasswordResetRequestFormComponent,
    PasswordResetComponent,
    PasswordResetFormComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  providers: [
    PasswordResetService
  ]
})
export class PasswordResetModule { }
