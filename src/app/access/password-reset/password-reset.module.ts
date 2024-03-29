import { NgModule } from '@angular/core';
import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetService } from './services/password-reset.service';



@NgModule({
  imports: [
    PasswordResetRoutingModule
  ],
  providers: [
    PasswordResetService
  ]
})
export class PasswordResetModule { }
