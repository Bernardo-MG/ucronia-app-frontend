import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login.service';



@NgModule({
  imports: [
    LoginRoutingModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
