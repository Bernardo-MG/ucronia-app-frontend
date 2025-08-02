import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/my-fees-list/my-fees-list.container').then(m => m.MyFeesFrontpageContainer),
    data: { breadcrumb: 'Mis cuotas' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFeesRoutingModule { }