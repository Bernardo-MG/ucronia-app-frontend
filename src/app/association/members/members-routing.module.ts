import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberListComponent } from './components/member-list/member-list.component';


const routes: Routes = [
  { path: '', component: MemberListComponent },
  { path: 'list', component: MemberListComponent },
  { path: 'create', component: MemberCreateComponent },
  { path: ':id', component: MemberDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }