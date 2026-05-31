import { Routes } from '@angular/router';
import { LoggedInGuard, ResourceGuard } from '@bernardo-mg/authentication';

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
        canActivate: [ResourceGuard('role', 'view')],
        loadComponent: () => import('./roles/role-view/role-view').then(m => m.RoleView)
      },
      {
        // Users
        path: 'users',
        canActivate: [ResourceGuard('user', 'view')],
        loadComponent: () => import('./users/user-view/user-view').then(m => m.UserView)
      },
      {
        // User tokens
        path: 'user-tokens',
        canActivate: [ResourceGuard('user_token', 'view')],
        loadComponent: () => import('./user-tokens/user-token-view/user-token-view').then(m => m.UserTokenView)
      },
      {
        // Security audit
        path: 'audit',
        canActivate: [ResourceGuard('user', 'view')],
        loadComponent: () => import('./audit/audit-view/audit-view').then(m => m.AuditView)
      }
    ]
  }
];
