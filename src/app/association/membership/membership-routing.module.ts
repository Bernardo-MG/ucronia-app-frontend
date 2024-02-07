import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDetailsComponent } from '../fees/components/fee-details/fee-details.component';
import { FeePayComponent } from '../fees/components/fee-pay/fee-pay.component';
import { MemberCreateComponent } from '../members/components/member-create/member-create.component';
import { MemberDetailsComponent } from '../members/components/member-details/member-details.component';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';


const routes: Routes = [
  { path: 'pay', component: FeePayComponent },
  { path: 'fee/:date/:memberNumber', component: FeeDetailsComponent },
  { path: '', component: MembershipFrontpageComponent },
  { path: 'register', component: MemberCreateComponent },
  { path: 'member/:number', component: MemberDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }