import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateViewComponent } from './containers/member-create/member-create.component';
import { MemberEditViewComponent } from './containers/member-edit/member-edit.component';
import { MemberListViewComponent } from './containers/member-list/member-list.component';
import { MemberStatsViewComponent } from './containers/member-stats/member-stats.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: MemberStatsViewComponent },
            { path: 'list', component: MemberListViewComponent },
            { path: 'stats', component: MemberStatsViewComponent },
            { path: 'create', component: MemberCreateViewComponent },
            { path: ':id', component: MemberEditViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembersRoutingModule { }