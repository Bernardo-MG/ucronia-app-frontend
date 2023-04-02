import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionTabsComponent } from './components/transaction-tabs/transaction-tabs.component';
import { TransactionService } from './service/transaction.service';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionCalendarViewComponent } from './containers/transaction-calendar-view/transaction-calendar-view.component';
import { TransactionCreateViewComponent } from './containers/transaction-create-view/transaction-create-view.component';
import { TransactionEditViewComponent } from './containers/transaction-edit-view/transaction-edit-view.component';
import { TransactionListViewComponent } from './containers/transaction-list-view/transaction-list-view.component';



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
    CoreModule
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionsModule { }
