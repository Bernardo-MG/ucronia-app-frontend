import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';


export const routes: Routes = [
  // Main app
  {
    path: '',
    loadComponent: () => import('@app/core/layout/components/association-layout/association-layout').then(m => m.AssociationLayout),
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
            loadComponent: () => import('./account/containers/account-profile-frontpage/account-profile-frontpage.container').then(m => m.AccountProfileFrontpageContainer),
            data: { breadcrumb: 'Perfil' }
          },
          {
            path: 'password',
            loadComponent: () => import('./account/containers/account-password-change/account-password-change.container').then(m => m.AccountPasswordChangeContainer),
            data: { breadcrumb: 'Contraseña' }
          }
        ]
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
        // Settings
        path: 'settings',
        canActivate: [LoggedInGuard, ResourceGuard("association_settings", "view")],
        loadComponent: () => import('./settings/containers/settings-edition/settings-edition.container').then(m => m.SettingsInfoEditorContainer)
      }
    ]
  }
];
