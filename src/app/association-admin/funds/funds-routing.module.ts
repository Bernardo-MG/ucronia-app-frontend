import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { FundsListingComponent } from './core/containers/funds-listing/funds-listing.container';
import { TransactionCreationComponent } from './core/containers/transaction-creation/transaction-creation.container';
import { TransactionEditionComponent } from './core/containers/transaction-edition/transaction-edition.component';


const routes: Routes = [
  { path: '', component: FundsListingComponent },
  { path: 'add', component: TransactionCreationComponent, canActivate: [ResourceGuard("transaction", "create")] },
  { path: 'transaction/:index', component: TransactionEditionComponent, canActivate: [ResourceGuard("transaction", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
