import { Routes } from '@angular/router';
import { LoggedInGuard, ResourceGuard } from '@bernardo-mg/authentication';
import { SecurityPermissions } from '@bernardo-mg/security';

export const securityRoutes: Routes = [
  {
    // Security
    path: 'security',
    canActivate: [LoggedInGuard],
    loadComponent: () => import('./layout/security-layout/security-layout').then(m => m.SecurityLayout),
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
        canActivate: [ResourceGuard(SecurityPermissions.role.read)],
        loadComponent: () => import('./roles/role-view/role-view').then(m => m.RoleView)
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard(SecurityPermissions.user.read)],
        loadComponent: () => import('./users/user-view/user-view').then(m => m.UserView)
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard(SecurityPermissions.userToken.read)],
        loadComponent: () => import('./user-tokens/user-token-view/user-token-view').then(m => m.UserTokenView)
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard(SecurityPermissions.loginRegister.read)],
        loadComponent: () => import('./audit/audit-view/audit-view').then(m => m.AuditView)
      }
    ]
  }
];
