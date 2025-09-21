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
            loadComponent: () => import('./roles/access-role-list/access-role-list').then(m => m.AccessRoleList),
            canActivate: [ResourceGuard("role", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: 'add',
            loadComponent: () => import('./roles/access-role-creation/access-role-creation').then(m => m.AccessRoleCreation),
            canActivate: [ResourceGuard("role", "create")],
            data: { breadcrumb: 'Registrar' }
          },
          {
            path: ':role',
            loadComponent: () => import('./roles/access-role-edition/access-role-edition').then(m => m.AccessRoleInfoEdition),
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
            loadComponent: () => import('./users/access-user-list/access-user-list').then(m => m.AccessList),
            canActivate: [ResourceGuard("user", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: 'add',
            loadComponent: () => import('./users/access-user-creation/access-user-creation').then(m => m.AccessUserCreation),
            canActivate: [ResourceGuard("user", "create")],
            data: { breadcrumb: 'Registrar' }
          },
          {
            path: ':user',
            loadComponent: () => import('./users/access-user-edition/access-user-edition').then(m => m.AccessUserEdition),
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
            loadComponent: () => import('./user-tokens/user-token-list/user-token-list').then(m => m.UserTokenList),
            canActivate: [ResourceGuard("user_token", "read")],
            data: { breadcrumb: '' }
          },
          {
            path: ':token',
            loadComponent: () => import('./user-tokens/user-token-edition/user-token-edition').then(m => m.UserTokenEdition),
            canActivate: [ResourceGuard("user_token", "read")],
            data: { breadcrumb: 'Editar' }
          }
        ]
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard("user", "view")],
        loadComponent: () => import('./audit/access-audit-login/access-audit-login').then(m => m.AccessAuditLogin)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
