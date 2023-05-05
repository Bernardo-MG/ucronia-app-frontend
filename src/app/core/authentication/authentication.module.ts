import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditionModule } from '@app/shared/edition/edition.module';
import { LoginComponent } from './containers/login/login.component';
import { JwtAuthenticationInterceptor } from './interceptors/jwt-authentication.interceptor';
import { UnauthorizedErrorInterceptor } from './interceptors/unauthorized.interceptor';
import { SecurityContainer } from './services/security-container.service';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditionModule
  ],
  providers: [
    SecurityContainer,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true }
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
