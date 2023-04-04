import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginViewComponent } from './containers/login/login.component';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';
import { AuthenticationContainer } from './services/authentication-container.service';
import { LoginService } from './services/login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtAuthenticationInterceptor } from './interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from './interceptors/unauthorized.interceptor';



@NgModule({
  declarations: [
    LogoutButtonComponent,
    LoginFormComponent,
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationContainer,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ],
  exports: [
    LogoutButtonComponent,
    LoginViewComponent
  ]
})
export class AuthenticationModule { }
