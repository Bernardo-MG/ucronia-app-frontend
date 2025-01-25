import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFeesFrontpageContainer } from './containers/my-fees-listing/my-fees-listing.container';


const routes: Routes = [
  {
    path: '',
    component: MyFeesFrontpageContainer,
    data: { breadcrumb: 'Mis cuotas' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFeesRoutingModule { }