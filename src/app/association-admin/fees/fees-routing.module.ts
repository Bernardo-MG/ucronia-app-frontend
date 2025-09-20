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
        loadComponent: () => import('./core/fee-list/fee-list').then(m => m.FeeList),
        canActivate: [ResourceGuard("fee", "read")],
        data: { breadcrumb: '' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }