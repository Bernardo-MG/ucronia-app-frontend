import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard } from '@bernardo-mg/authentication';


export const routes: Routes = [
  // Main app
  {
    path: '',
    loadComponent: () => import('@app/core/layout/components/association-layout/association-layout').then(m => m.AssociationLayout),
    children: [
      // Public routes
      {
        // Logged out
        path: '',
        loadChildren: () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule)
      },
      {
        // Log in form
        path: 'login',
        canActivate: [LoggedOutGuard],
        loadChildren: () => import('@app/access/login/login.module').then(m => m.LoginModule)
      },
      {
        // Password reset form
        path: 'password/reset',
        canActivate: [LoggedOutGuard],
        loadChildren: () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule)
      },
      {
        // Activate user form
        path: 'users/activate',
        canActivate: [LoggedOutGuard],
        loadChildren: () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule)
      },
      // Private routes
      // Security
      {
        // Account
        path: 'account',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('@app/account/account.module').then(m => m.AccountModule)
      },
      {
        // Association admin
        path: 'association/admin',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('@app/association-admin/association-admin.module').then(m => m.AssociationAdminModule)
      },
      {
        // Association
        path: 'association',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('@app/association/association.module').then(m => m.AssociationModule)
      },
      {
        // Security
        path: 'security',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('@app/security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'settings',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('@app/settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  }
];
