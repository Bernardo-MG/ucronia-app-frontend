import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './containers/member-create/member-create.component';
import { MemberEditComponent } from './containers/member-edit/member-edit.component';
import { MemberListComponent } from './containers/member-list/member-list.component';
import { MemberStatsComponent } from './containers/member-stats/member-stats.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MemberStatsComponent },
      { path: 'list', component: MemberListComponent },
      { path: 'stats', component: MemberStatsComponent },
      { path: 'create', component: MemberCreateComponent },
      { path: ':id', component: MemberEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }