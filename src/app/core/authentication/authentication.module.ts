import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtAuthenticationInterceptor } from './interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from './interceptors/unauthorized.interceptor';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ]
})
export class AuthenticationModule { }
