import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './services/account.service';



@NgModule({
  imports: [
    AccountRoutingModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
