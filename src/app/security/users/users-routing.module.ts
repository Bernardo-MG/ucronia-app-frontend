import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Usuarios' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/access-user-list/access-user-list.container').then(m => m.AccessListContainer),
        canActivate: [ResourceGuard("user", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        loadComponent: () => import('./containers/access-user-creation/access-user-creation.container').then(m => m.AccessUserCreationContainer),
        canActivate: [ResourceGuard("user", "create")],
        data: { breadcrumb: 'Registrar' }
      },
      {
        path: ':user',
        loadComponent: () => import('./containers/access-user-edition/access-user-edition.container').then(m => m.AccessUserEditionContainer),
        canActivate: [ResourceGuard("user", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }