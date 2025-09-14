import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Fondos' },
    children: [
      {
        path: '',
        loadComponent: () => import('./core/funds/funds').then(m => m.Funds),
        canActivate: [ResourceGuard("transaction", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        loadComponent: () => import('./core/transaction-creation/transaction-creation').then(m => m.TransactionCreation),
        canActivate: [ResourceGuard("transaction", "create")],
        data: { breadcrumb: 'Registro de transacción' }
      },
      {
        path: 'transaction/:index',
        loadComponent: () => import('./core/transaction-edition/transaction-edition').then(m => m.TransactionEdition),
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
