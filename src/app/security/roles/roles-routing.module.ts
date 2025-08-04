import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Roles' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/access-role-list/access-role-list.container').then(m => m.AccessRoleListContainer),
        canActivate: [ResourceGuard("role", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        loadComponent: () => import('./containers/access-role-creation/access-role-creation.container').then(m => m.AccessRoleCreationContainer),
        canActivate: [ResourceGuard("role", "create")],
        data: { breadcrumb: 'Registrar' }
      },
      {
        path: ':role',
        loadComponent: () => import('./containers/access-role-edition/access-role-edition.container').then(m => m.AccessRoleInfoEditionContainer),
        canActivate: [ResourceGuard("role", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }