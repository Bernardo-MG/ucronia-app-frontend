import { NgModule } from '@angular/core';
import { UserFeeService } from './services/user-fee.service';
import { UserFeesRoutingModule } from './user-fees-routing.module';



@NgModule({
  imports: [
    UserFeesRoutingModule
  ],
  providers: [
    UserFeeService
  ]
})
export class UserFeesModule { }
