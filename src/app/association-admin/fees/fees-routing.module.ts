import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { FeeEditionContainer } from './containers/fee-edition/fee-edition.container';
import { FeeListingContainer } from './containers/fee-listing/fee-listing.container';
import { FeePayContainer } from './containers/fee-pay/fee-pay.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Cuotas' },
    children: [
      {
        path: '',
        component: FeeListingContainer,
        canActivate: [ResourceGuard("fee", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'pay',
        component: FeePayContainer,
        canActivate: [ResourceGuard("fee", "create")],
        data: { breadcrumb: 'Pagar' }
      },
      {
        path: ':date/:memberNumber',
        component: FeeEditionContainer,
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