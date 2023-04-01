import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtAuthenticationInterceptor } from '../../core/interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from '../../core/interceptors/unauthorized.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ]
})
export class AuthenticationModule { }
