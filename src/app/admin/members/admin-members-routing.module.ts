import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMemberViewComponent } from './views/admin-member-view/admin-member-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminMemberViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMembersRoutingModule { }