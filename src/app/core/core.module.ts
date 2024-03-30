import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/authentication.module';



@NgModule({
  imports: [
    AuthenticationModule
  ],
  exports: [
    AuthenticationModule
  ]
})
export class CoreModule { }
