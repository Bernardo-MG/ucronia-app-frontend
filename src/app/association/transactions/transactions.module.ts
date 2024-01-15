import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FundsBalanceChartComponent } from './components/funds-balance-chart/funds-balance-chart.component';
import { FundsCalendarComponent } from './components/funds-calendar/funds-calendar.component';
import { FundsCurrentBalanceComponent } from './components/funds-current-balance/funds-current-balance.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { BalanceService } from './service/balance.service';
import { FundsCalendarService } from './service/funds-calendar.service';
import { TransactionService } from './service/transaction.service';



@NgModule({
  declarations: [
    TransactionCreateComponent,
    TransactionDetailsComponent,
    FundsCalendarComponent,
    TransactionFormComponent,
    TransactionInfoComponent,
    FundsBalanceChartComponent,
    FundsCurrentBalanceComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    BalanceService,
    TransactionService,
    FundsCalendarService
  ]
})
export class TransactionsModule { }
