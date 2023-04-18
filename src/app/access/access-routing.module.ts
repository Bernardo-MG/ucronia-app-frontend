import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const roleModule = () => import('./roles/access-roles.module').then(m => m.AccessRolesModule);
const userModule = () => import('./users/access-users.module').then(m => m.AccessUsersModule);
const registerModule = () => import('./register/access-register.module').then(m => m.AccessRegisterModule);

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'roles', loadChildren: roleModule },
            { path: 'users', loadChildren: userModule },
            { path: 'register', loadChildren: registerModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessRoutingModule { }