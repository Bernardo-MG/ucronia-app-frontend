import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { ResourceGuard } from './core/authentication/guards/resource.guard';
import { PublicLayoutComponent } from './core/layout/components/simple-layout/simple-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const associationAdminModule = () => import('@app/association-admin/association-admin.module').then(m => m.AssociationAdminModule);
const securityModule = () => import('@app/security/security.module').then(m => m.SecurityModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const loginModule = () => import('@app/access/login/login.module').then(m => m.LoginModule);
const activateUserModule = () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule);
const resetPasswordModule = () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule);
const settingsModule = () => import('@app/settings/settings.module').then(m => m.SettingsModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      // Public routes
      {
        // Logged out
        path: '',
        component: PublicLayoutComponent,
        loadChildren: frontpageModule
      },
      {
        // Log in form
        path: 'login',
        component: PublicLayoutComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: loginModule
      },
      {
        // Password reset form
        path: 'password/reset',
        component: PublicLayoutComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: resetPasswordModule
      },
      {
        // Activate user form
        path: 'users/activate',
        component: PublicLayoutComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
