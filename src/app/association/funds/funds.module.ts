import { NgModule } from '@angular/core';
import { TransactionsModule } from '../transactions/transactions.module';
import { FundsRoutingModule } from './funds-routing.module';



@NgModule({
  imports: [
    FundsRoutingModule,
    TransactionsModule
  ]
})
export class FundsModule { }
