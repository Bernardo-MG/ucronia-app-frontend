import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FundsBalanceChartComponent } from './components/transaction-balance-chart/transaction-balance-chart.component';
import { FundsCalendarComponent } from './components/transaction-calendar/transaction-calendar.component';
import { FundsCurrentBalanceComponent } from './components/transaction-current-balance/transaction-current-balance.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { TransactionBalanceService } from './service/transaction-balance.service';
import { TransactionCalendarService } from './service/transaction-calendar.service';
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ScheduleModule,
    PaginationModule,
    LayoutModule,
    FontAwesomeModule,
    MenuModule,
    IconsModule,
  ],
  exports: [
    TransactionCreateComponent,
    TransactionDetailsComponent,
    FundsCalendarComponent,
    TransactionFormComponent,
    TransactionInfoComponent,
    FundsBalanceChartComponent,
    FundsCurrentBalanceComponent
  ],
  providers: [
    TransactionBalanceService,
    TransactionService,
    TransactionCalendarService
  ]
})
export class TransactionsModule { }
