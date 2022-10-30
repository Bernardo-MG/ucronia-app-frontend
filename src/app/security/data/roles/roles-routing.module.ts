import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityRoleCreateViewComponent } from './views/security-role-create-view/security-role-create-view.component';
import { SecurityRoleEditViewComponent } from './views/security-role-edit-view/security-role-edit-view.component';
import { SecurityRoleListViewComponent } from './views/security-role-list-view/security-role-list-view.component';


const routes: Routes = [
    { path: '', component: SecurityRoleListViewComponent },
    { path: 'create', component: SecurityRoleCreateViewComponent },
    { path: ':id', component: SecurityRoleEditViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }