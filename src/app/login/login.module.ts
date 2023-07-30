import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@app/login/components/login-form/login-form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetRequestFormComponent } from './components/password-reset-request-form/password-reset-request-form.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    PasswordResetRequestComponent,
    PasswordResetRequestFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
