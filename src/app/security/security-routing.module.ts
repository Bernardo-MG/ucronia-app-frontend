import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/security/layout/security-layout/security-layout').then(m => m.SecurityLayout),
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
            canActivate: [ResourceGuard("role", "read")]
          },
          {
            path: 'add',
            loadComponent: () => import('./roles/access-role-creation/access-role-creation').then(m => m.AccessRoleCreation),
            canActivate: [ResourceGuard("role", "create")]
          },
          {
            path: ':role',
            loadComponent: () => import('./roles/access-role-edition/access-role-edition').then(m => m.AccessRoleInfoEdition),
            canActivate: [ResourceGuard("role", "read")]
          }
        ]
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard("user", "view")],
        loadComponent: () => import('./users/access-user-list/access-user-list').then(m => m.AccessList)
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard("user_token", "view")],
        loadComponent: () => import('./user-tokens/user-token-list/user-token-list').then(m => m.UserTokenList)
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
