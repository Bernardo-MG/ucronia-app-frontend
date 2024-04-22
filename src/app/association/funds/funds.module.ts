import { NgModule } from '@angular/core';
import { FundsRoutingModule } from './funds-routing.module';
import { TransactionBalanceService } from './service/transaction-balance.service';
import { TransactionCalendarService } from './service/transaction-calendar.service';
import { TransactionService } from './service/transaction.service';



@NgModule({
  imports: [
    FundsRoutingModule
  ],
  providers: [
    TransactionBalanceService,
    TransactionService,
    TransactionCalendarService
  ]
})
export class FundsModule { }
