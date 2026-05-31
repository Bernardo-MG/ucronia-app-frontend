import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';
import { associationRoutes } from './association/association.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@app/core/layout/association-layout/association-layout')
        .then(m => m.AssociationLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./frontpage/frontpage/frontpage')
            .then(m => m.Frontpage)
      },
      {
        path: '',
        canActivateChild: [LoggedOutGuard],
        children: [
          {
            path: 'login',
            loadComponent: () => import('@bernardo-mg/login').then(m => m.LoginView)
          },
          {
            path: 'password/reset',
            children: [
              {
                path: '',
                loadComponent: () => import('@bernardo-mg/login').then(m => m.PasswordResetRequestView)
              },
              {
                path: ':token',
                loadComponent: () => import('@bernardo-mg/login').then(m => m.PasswordResetView)
              }
            ]
          },
          {
            path: 'users/activate/:token',
            loadComponent: () =>
              import('./access/user-activation/user-activation-view/user-activation-view')
                .then(m => m.UserActivationView)
          }
        ]
      },
      {
        path: '',
        canActivateChild: [LoggedInGuard],
        children: [
          {
            path: 'account',
            loadComponent: () =>
              import('./account/account-layout/account-layout')
                .then(m => m.AccountLayout),
            children: [
              { path: '', redirectTo: 'profile', pathMatch: 'full' },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./account/account-profile-view/account-profile-view')
                    .then(m => m.AccountProfileView)
              },
              {
                path: 'password',
                loadComponent: () =>
                  import('./account/account-password-change-view/account-password-change-view')
                    .then(m => m.AccountPasswordChangeView)
              }
            ]
          },
          {
            path: 'association',
            children: associationRoutes
          },

          {
            // Security
            path: 'security',
            canActivate: [LoggedInGuard],
            loadComponent: () => import('./security/layout/security-layout/security-layout').then(m => m.SecurityLayout),
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
                loadComponent: () => import('./security/roles/role-view/role-view').then(m => m.RoleView)
              },
              {
                // Users
                path: 'users',
                canActivate: [ResourceGuard("user", "view")],
                loadComponent: () => import('./security/users/user-view/user-view').then(m => m.UserView)
              },
              {
                // User tokens
                path: 'user-tokens',
                canActivate: [ResourceGuard("user_token", "view")],
                loadComponent: () => import('./security/user-tokens/user-token-view/user-token-view').then(m => m.UserTokenView)
              },
              {
                // Security audit
                path: 'audit',
                canActivate: [ResourceGuard("user", "view")],
                loadComponent: () => import('./security/audit/audit-view/audit-view').then(m => m.AuditView)
              }
            ]
          },
          {
            path: 'settings',
            canActivate: [ResourceGuard('association_settings', 'view')],
            loadComponent: () =>
              import('./settings/settings-view/settings-view')
                .then(m => m.SettingsView)
          }
        ]
      }
    ]
  }
];

