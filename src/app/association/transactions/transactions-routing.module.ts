import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionFrontpageComponent } from './components/transaction-frontpage/transaction-frontpage.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionLayoutComponent } from './components/transaction-layout/transaction-layout.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: '',
    component: TransactionLayoutComponent,
    children: [
      { path: '', component: TransactionFrontpageComponent },
      { path: 'list', component: TransactionListComponent },
      { path: 'calendar', component: TransactionFrontpageComponent },
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