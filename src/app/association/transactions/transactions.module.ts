import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionCalendarComponent } from './containers/transaction-calendar/transaction-calendar.component';
import { TransactionCreateComponent } from './containers/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './containers/transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './containers/transaction-list/transaction-list.component';
import { TransactionService } from './service/transaction.service';
import { TransactionsRoutingModule } from './transactions-routing.module';



@NgModule({
  declarations: [
    TransactionFormComponent,
    TransactionCreateComponent,
    TransactionListComponent,
    TransactionEditComponent,
    TransactionCalendarComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CalendarModule,
    PaginationModule,
    IconsModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionsModule { }
