import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMemberCreateViewComponent } from './views/admin-member-create-view/admin-member-create-view.component';
import { AdminMemberEditViewComponent } from './views/admin-member-edit-view/admin-member-edit-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'create', component: AdminMemberCreateViewComponent },
            { path: ':id', component: AdminMemberEditViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembersRoutingModule { }