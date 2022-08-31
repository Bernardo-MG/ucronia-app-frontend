import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminMemberListViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMembersRoutingModule { }