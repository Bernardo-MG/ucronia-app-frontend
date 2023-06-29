import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCalendarComponent } from './components/transaction-calendar/transaction-calendar.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TransactionCalendarComponent },
      { path: 'list', component: TransactionListComponent },
      { path: 'calendar', component: TransactionCalendarComponent },
      { path: 'create', component: TransactionCreateComponent },
      { path: ':id', component: TransactionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }