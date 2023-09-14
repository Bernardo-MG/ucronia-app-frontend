import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeFrontpageComponent } from './components/fee-frontpage/fee-frontpage.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';


const routes: Routes = [
  { path: '', component: FeeFrontpageComponent },
  { path: 'pay', component: FeePayComponent },
  { path: ':id', component: FeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }