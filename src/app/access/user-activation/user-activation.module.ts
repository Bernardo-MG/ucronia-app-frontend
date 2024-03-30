import { NgModule } from '@angular/core';
import { AccessUserActivateService } from './services/user-activate.service';
import { UserActivationRoutingModule } from './user-activation-routing.module';



@NgModule({
  imports: [
    UserActivationRoutingModule
  ],
  providers: [
    AccessUserActivateService
  ]
})
export class UserActivationModule { }
