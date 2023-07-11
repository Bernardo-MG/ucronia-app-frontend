import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberStatsComponent } from './components/member-stats/member-stats.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MemberStatsComponent },
      { path: 'list', component: MemberListComponent },
      { path: 'stats', component: MemberStatsComponent },
      { path: 'create', component: MemberCreateComponent },
      { path: ':id', component: MemberDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }