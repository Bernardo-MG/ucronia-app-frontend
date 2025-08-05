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
        loadComponent: () => import('./core/containers/funds-list/funds-list.container').then(m => m.FundsListComponent),
        canActivate: [ResourceGuard("transaction", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        loadComponent: () => import('./core/containers/transaction-creation/transaction-creation.container').then(m => m.TransactionCreationComponent),
        canActivate: [ResourceGuard("transaction", "create")],
        data: { breadcrumb: 'Registro de transacción' }
      },
      {
        path: 'transaction/:index',
        loadComponent: () => import('./core/containers/transaction-edition/transaction-edition.component').then(m => m.TransactionEditionComponent),
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
