import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsFrontpageComponent } from './components/funds-frontpage/funds-frontpage.component';
import { TransactionCreateComponent } from '../transactions/components/transaction-create/transaction-create.component';
import { TransactionInfoEditorComponent } from '../transactions/components/transaction-info-editor/transaction-info-editor.component';


const routes: Routes = [
  { path: '', component: FundsFrontpageComponent },
  { path: 'add', component: TransactionCreateComponent },
  { path: 'transaction/:index', component: TransactionInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
