import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Cuotas' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/fee-list/fee-list.container').then(m => m.FeeListContainer),
        canActivate: [ResourceGuard("fee", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'pay',
        loadComponent: () => import('./containers/fee-pay/fee-pay.container').then(m => m.FeePayContainer),
        canActivate: [ResourceGuard("fee", "create")],
        data: { breadcrumb: 'Pagar' }
      },
      {
        path: ':date/:memberNumber',
        loadComponent: () => import('./containers/fee-edition/fee-edition.container').then(m => m.FeeEditionContainer),
        canActivate: [ResourceGuard("fee", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }