import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsFrontpageComponent } from './components/funds-frontpage/funds-frontpage.component';
import { TransactionCreateComponent } from '../transactions/components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from '../transactions/components/transaction-details/transaction-details.component';


const routes: Routes = [
  { path: '', component: FundsFrontpageComponent },
  { path: 'add', component: TransactionCreateComponent },
  { path: 'transaction/:id', component: TransactionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
