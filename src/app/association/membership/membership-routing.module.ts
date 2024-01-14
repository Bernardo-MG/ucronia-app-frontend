import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';


const routes: Routes = [
  { path: '', component: MembershipFrontpageComponent },
  { path: 'register', component: MemberCreateComponent },
  { path: 'member/:number', component: MemberDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }