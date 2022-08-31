import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateViewComponent } from './views/member-create-view/member-create-view.component';
import { MemberEditViewComponent } from './views/member-edit-view/member-edit-view.component';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: MemberListViewComponent },
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