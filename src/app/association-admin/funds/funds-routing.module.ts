import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { TransactionCreateComponent } from './views/components/transaction-create/transaction-create.component';
import { TransactionInfoEditorComponent } from './views/components/transaction-info-editor/transaction-info-editor.component';
import { FundsFrontpageComponent } from './views/components/funds-frontpage/funds-frontpage.component';


const routes: Routes = [
  { path: '', component: FundsFrontpageComponent },
  { path: 'add', component: TransactionCreateComponent, canActivate: [ResourceGuard("transaction", "create")] },
  { path: 'transaction/:index', component: TransactionInfoEditorComponent, canActivate: [ResourceGuard("transaction", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
