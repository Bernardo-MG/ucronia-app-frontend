import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtAuthenticationInterceptor } from '../interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from '../interceptors/unauthorized.interceptor';
import { SecurityRoutingModule } from './security-routing.module';
import { AuthenticationContainer } from './services/authentication-container.service';
import { LoginService } from './services/login.service';
import { SecurityRegisterService } from './services/security-register.service';



@NgModule({
  declarations: [],
  providers: [
    AuthenticationContainer,
    LoginService,
    SecurityRegisterService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
