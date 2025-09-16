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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
