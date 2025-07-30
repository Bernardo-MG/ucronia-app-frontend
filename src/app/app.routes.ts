import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';


const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const associationAdminModule = () => import('@app/association-admin/association-admin.module').then(m => m.AssociationAdminModule);
const securityModule = () => import('@app/security/security.module').then(m => m.SecurityModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const loginModule = () => import('@app/access/login/login.module').then(m => m.LoginModule);
const activateUserModule = () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule);
const resetPasswordModule = () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule);
const settingsModule = () => import('@app/settings/settings.module').then(m => m.SettingsModule);

export const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      // Public routes
      {
        // Logged out
        path: '',
        loadComponent: () => import('./core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
        loadChildren: frontpageModule
      },
      {
        // Log in form
        path: 'login',
        loadComponent: () => import('./core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
        canActivate: [LoggedOutGuard],
        loadChildren: loginModule
      },
      {
        // Password reset form
        path: 'password/reset',
        loadComponent: () => import('./core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
        canActivate: [LoggedOutGuard],
        loadChildren: resetPasswordModule
      },
      {
        // Activate user form
        path: 'users/activate',
        loadComponent: () => import('./core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
        loadChildren: activateUserModule,
        canActivate: [LoggedOutGuard]
      },
      // Private routes
      // Security
      {
        // Account
        path: 'account',
        loadChildren: accountModule,
        canActivate: [LoggedInGuard]
      },
      {
        // Association admin
        path: 'association/admin',
        loadChildren: associationAdminModule,
        canActivate: [LoggedInGuard]
      },
      {
        // Association
        path: 'association',
        loadChildren: associationModule,
        canActivate: [LoggedInGuard]
      },
      {
        // Security
        path: 'security',
        loadChildren: securityModule,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'settings',
        loadChildren: settingsModule,
        canActivate: [LoggedInGuard, ResourceGuard("association_settings", "view")]
      }
    ]
  }
];
