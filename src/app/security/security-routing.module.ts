import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/security/layout/containers/security-layout/security-layout.container').then(m => m.SecurityLayoutContainer),
    children: [
      {
        // Root
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        // Roles
        path: 'roles',
        canActivate: [ResourceGuard("role", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./roles/containers/access-role-list/access-role-list.container').then(m => m.AccessRoleListContainer),
            canActivate: [ResourceGuard("role", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: 'add',
            loadComponent: () => import('./roles/containers/access-role-creation/access-role-creation.container').then(m => m.AccessRoleCreationContainer),
            canActivate: [ResourceGuard("role", "create")],
            data: { breadcrumb: 'Registrar' }
          },
          {
            path: ':role',
            loadComponent: () => import('./roles/containers/access-role-edition/access-role-edition.container').then(m => m.AccessRoleInfoEditionContainer),
            canActivate: [ResourceGuard("role", "read")],
            data: { breadcrumb: 'Editar' }
          }
        ]
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard("user", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./users/containers/access-user-list/access-user-list.container').then(m => m.AccessListContainer),
            canActivate: [ResourceGuard("user", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: 'add',
            loadComponent: () => import('./users/containers/access-user-creation/access-user-creation.container').then(m => m.AccessUserCreationContainer),
            canActivate: [ResourceGuard("user", "create")],
            data: { breadcrumb: 'Registrar' }
          },
          {
            path: ':user',
            loadComponent: () => import('./users/containers/access-user-edition/access-user-edition.container').then(m => m.AccessUserEditionContainer),
            canActivate: [ResourceGuard("user", "read")],
            data: { breadcrumb: 'Editar' }
          }
        ]
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard("user_token", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./user-tokens/containers/user-token-list/user-token-list.container').then(m => m.UserTokenListContainer),
            canActivate: [ResourceGuard("user_token", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: ':token',
            loadComponent: () => import('./user-tokens/containers/user-token-edition/user-token-edition.container').then(m => m.UserTokenEditionContainer),
            canActivate: [ResourceGuard("user_token", "read")],
            data: { breadcrumb: 'Editar' }
          }
        ]
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard("user", "view")],
        loadComponent: () => import('./audit/containers/access-audit-login/access-audit-login.container').then(m => m.AccessAuditLoginContainer)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
