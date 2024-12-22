import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFeesFrontpageComponent } from './containers/my-fees-listing/my-fees-listing.container';


const routes: Routes = [
  { path: '', component: MyFeesFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFeesRoutingModule { }