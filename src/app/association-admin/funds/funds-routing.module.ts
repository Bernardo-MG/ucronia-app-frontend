import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { FundsListingComponent } from './core/containers/funds-listing/funds-listing.container';
import { TransactionCreationComponent } from './core/containers/transaction-creation/transaction-creation.container';
import { TransactionEditionComponent } from './core/containers/transaction-edition/transaction-edition.component';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Fondos' },
    children: [
      {
        path: '',
        component: FundsListingComponent,
        canActivate: [ResourceGuard("transaction", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        component: TransactionCreationComponent,
        canActivate: [ResourceGuard("transaction", "create")],
        data: { breadcrumb: 'Registro de transacción' }
      },
      {
        path: 'transaction/:index',
        component: TransactionEditionComponent,
        canActivate: [ResourceGuard("transaction", "read")],
        data: { breadcrumb: 'Edición de transacción' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
