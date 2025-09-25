import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';


export const routes: Routes = [
  // Main app
  {
    path: '',
    loadComponent: () => import('@app/core/layout/association-layout/association-layout').then(m => m.AssociationLayout),
    children: [
      // Public routes
      {
        // Frontpage
        path: '',
        loadComponent: () => import('./frontpage/frontpage/frontpage').then(m => m.Frontpage)
      },
      {
        // Log in form
        path: 'login',
        canActivate: [LoggedOutGuard],
        loadComponent: () => import('./access/login/login/login').then(m => m.Login)
      },
      {
        // Password reset form
        path: 'password/reset',
        canActivate: [LoggedOutGuard],
        children: [
          { path: '', loadComponent: () => import('./access/password-reset/password-reset-request/password-reset-request').then(m => m.PasswordResetRequest) },
          { path: ':token', loadComponent: () => import('./access/password-reset/password-reset/password-reset').then(m => m.PasswordReset) }
        ]
      },
      {
        // Activate user form
        path: 'users/activate',
        canActivate: [LoggedOutGuard],
        loadComponent: () => import('./access/user-activation/user-activation/user-activation.container').then(m => m.UserActivation)
      },
      // Private routes
      // Security
      {
        // Account
        path: 'account',
        canActivate: [LoggedInGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            loadComponent: () => import('./account/account-profile-frontpage/account-profile-frontpage').then(m => m.AccountProfileFrontpage)
          },
          {
            path: 'password',
            loadComponent: () => import('./account/account-password-change/account-password-change').then(m => m.AccountPasswordChange)
          }
        ]
      },
      {
        // Association admin
        path: 'association/admin',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('./association-admin/association-admin.module').then(m => m.AssociationAdminModule)
      },
      {
        // Association
        path: 'association',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('./association/association.module').then(m => m.AssociationModule)
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
            loadComponent: () => import('./security/roles/access-role-list/access-role-list').then(m => m.AccessRoleList)
          },
          {
            // Users
            path: 'users',
            canActivate: [ResourceGuard("user", "view")],
            loadComponent: () => import('./security/users/access-user-list/access-user-list').then(m => m.AccessList)
          },
          {
            // User tokens
            path: 'user-tokens',
            canActivate: [ResourceGuard("user_token", "view")],
            loadComponent: () => import('./security/user-tokens/user-token-list/user-token-list').then(m => m.UserTokenList)
          },
          {
            // Security audit
            path: 'audit',
            canActivate: [ResourceGuard("user", "view")],
            loadComponent: () => import('./security/audit/access-audit-login/access-audit-login').then(m => m.AccessAuditLogin)
          }
        ]
      },
      {
        // Settings
        path: 'settings',
        canActivate: [LoggedInGuard, ResourceGuard("association_settings", "view")],
        loadComponent: () => import('./settings/settings-edition/settings-edition').then(m => m.SettingsInfoEditor)
      }
    ]
  }
];
