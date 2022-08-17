import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMemberCreateViewComponent } from './views/admin-member-create-view/admin-member-create-view.component';
import { AdminMemberInfoViewComponent } from './views/admin-member-edit-view/admin-member-edit-view.component';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminMemberListViewComponent },
            { path: 'create', component: AdminMemberCreateViewComponent },
            { path: ':id', component: AdminMemberInfoViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembersRoutingModule { }