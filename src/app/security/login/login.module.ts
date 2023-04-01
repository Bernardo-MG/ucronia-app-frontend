import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  imports: [
    LoginRoutingModule,
    FontAwesomeModule,
    AuthenticationModule,
    CommonModule,
    CoreModule
  ]
})
export class LoginModule { }
