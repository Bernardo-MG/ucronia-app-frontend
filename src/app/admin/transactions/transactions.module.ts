import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from '@app/calendar/calendar.module';
import { CoreModule } from '@app/core/core.module';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionTabsComponent } from './components/transaction-tabs/transaction-tabs.component';
import { TransactionService } from './service/transaction.service';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionCalendarViewComponent } from './views/transaction-calendar-view/transaction-calendar-view.component';
import { TransactionCreateViewComponent } from './views/transaction-create-view/transaction-create-view.component';
import { TransactionEditViewComponent } from './views/transaction-edit-view/transaction-edit-view.component';
import { TransactionListViewComponent } from './views/transaction-list-view/transaction-list-view.component';



@NgModule({
  declarations: [
    TransactionFormComponent,
    TransactionCreateViewComponent,
    TransactionListViewComponent,
    TransactionEditViewComponent,
    TransactionCalendarViewComponent,
    TransactionTabsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CalendarModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionsModule { }
