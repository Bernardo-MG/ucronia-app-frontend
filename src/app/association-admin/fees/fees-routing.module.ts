import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { FeeEditionContainer } from './containers/fee-edition/fee-edition.container';
import { FeeListingContainer } from './containers/fee-listing/fee-listing.container';
import { FeePayContainer } from './containers/fee-pay/fee-pay.container';


const routes: Routes = [
  { path: '', component: FeeListingContainer },
  { path: 'pay', component: FeePayContainer, canActivate: [ResourceGuard("fee", "create")] },
  { path: ':date/:memberNumber', component: FeeEditionContainer, canActivate: [ResourceGuard("fee", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }