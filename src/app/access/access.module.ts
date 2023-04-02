import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessRoutingModule } from './access-routing.module';
import { SecurityRegisterService } from './register/security-register.service';



@NgModule({
  providers: [
    SecurityRegisterService
  ],
  imports: [
    CommonModule,
    AccessRoutingModule
  ]
})
export class AccessModule { }
