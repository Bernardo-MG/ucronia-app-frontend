import { NgModule } from '@angular/core';
import { TransactionBalanceService } from './service/transaction-balance.service';
import { TransactionCalendarService } from './service/transaction-calendar.service';
import { TransactionService } from './service/transaction.service';



@NgModule({
  providers: [
    TransactionBalanceService,
    TransactionService,
    TransactionCalendarService
  ]
})
export class TransactionsModule { }
