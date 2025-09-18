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
        loadComponent: () => import('./containers/fee-list/fee-list').then(m => m.FeeList),
        canActivate: [ResourceGuard("fee", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: ':date/:memberNumber',
        loadComponent: () => import('./containers/fee-edition/fee-edition').then(m => m.FeeEdition),
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