import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { TransactionCalendarComponent } from './containers/transaction-calendar/transaction-calendar.component';
import { TransactionCreateComponent } from './containers/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './containers/transaction-details/transaction-details.component';
import { TransactionListComponent } from './containers/transaction-list/transaction-list.component';
import { TransactionService } from './service/transaction.service';
import { TransactionsRoutingModule } from './transactions-routing.module';



@NgModule({
  declarations: [
    TransactionCreateComponent,
    TransactionListComponent,
    TransactionDetailsComponent,
    TransactionCalendarComponent,
    TransactionFormComponent,
    TransactionInfoComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CalendarModule,
    PaginationModule,
    LayoutModule,
    FontAwesomeModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionsModule { }
