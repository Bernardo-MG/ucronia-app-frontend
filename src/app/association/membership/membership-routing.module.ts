import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';


const routes: Routes = [
  { path: '', component: MembershipFrontpageComponent },
  { path: 'register', component: MemberCreateComponent },
  { path: 'member/:id', component: MemberDetailsComponent },
  { path: 'pay', component: FeePayComponent },
  { path: 'fee/:id', component: FeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }