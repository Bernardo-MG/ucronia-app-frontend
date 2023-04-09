import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@app/core/layout/components/main-layout/main-layout.component';

const roleModule = () => import('./roles/roles.module').then(m => m.RolesModule);
const userModule = () => import('./users/users.module').then(m => m.UsersModule);
const registerModule = () => import('./register/register.module').then(m => m.RegisterModule);

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
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