import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberFrontpageComponent } from './components/member-frontpage/member-frontpage.component';


const routes: Routes = [
  { path: '', component: MemberFrontpageComponent },
  { path: 'register', component: MemberCreateComponent },
  { path: ':id', component: MemberDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }