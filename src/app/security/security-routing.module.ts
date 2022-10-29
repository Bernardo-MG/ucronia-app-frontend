import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityChangePasswordViewComponent } from './register/views/security-change-password-view/security-change-password-view.component';
import { SecurityRegisterViewComponent } from './register/views/security-register-view/security-register-view.component';
import { SecurityRoleCreateViewComponent } from './roles/views/security-role-create-view/security-role-create-view.component';
import { SecurityRoleEditViewComponent } from './roles/views/security-role-edit-view/security-role-edit-view.component';
import { SecurityRoleListViewComponent } from './roles/views/security-role-list-view/security-role-list-view.component';
import { SecurityUserCreateViewComponent } from './users/views/security-user-create-view/security-user-create-view.component';
import { SecurityUserEditViewComponent } from './users/views/security-user-edit-view/security-user-edit-view.component';
import { SecurityUserListViewComponent } from './users/views/security-user-list-view/security-user-list-view.component';


const routes: Routes = [
    {
        path: 'roles',
        children: [
            { path: '', component: SecurityRoleListViewComponent },
            { path: 'create', component: SecurityRoleCreateViewComponent },
            { path: ':id', component: SecurityRoleEditViewComponent }
        ]
    },
    {
        path: 'users',
        children: [
            { path: '', component: SecurityUserListViewComponent },
            { path: 'create', component: SecurityUserCreateViewComponent },
            { path: ':id', component: SecurityUserEditViewComponent }
        ]
    },
    {
        path: 'register', component: SecurityRegisterViewComponent
    },
    {
        path: 'password', component: SecurityChangePasswordViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }