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
import { TransactionBalanceService } from './service/transaction-balance.service';
import { TransactionCalendarService } from './service/transaction-calendar.service';
import { TransactionService } from './service/transaction.service';



@NgModule({
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
  providers: [
    TransactionBalanceService,
    TransactionService,
    TransactionCalendarService
  ]
})
export class TransactionsModule { }
