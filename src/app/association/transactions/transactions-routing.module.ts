import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionFrontpageComponent } from './components/transaction-frontpage/transaction-frontpage.component';


const routes: Routes = [
  { path: '', component: TransactionFrontpageComponent },
  { path: 'calendar', component: TransactionFrontpageComponent },
  { path: 'add', component: TransactionCreateComponent },
  { path: ':id', component: TransactionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }