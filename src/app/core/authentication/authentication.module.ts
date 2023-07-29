import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { JwtAuthenticationInterceptor } from './interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from './interceptors/unauthorized.interceptor';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    RouterModule
  ],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
