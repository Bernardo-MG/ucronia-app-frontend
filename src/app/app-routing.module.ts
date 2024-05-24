import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationLayoutComponent } from './association/layout/components/association-layout/association-layout.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { PublicLayoutComponent } from './core/layout/components/layout/public-layout/public-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const securityModule = () => import('@app/security/security.module').then(m => m.SecurityModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const loginModule = () => import('@app/access/login/login.module').then(m => m.LoginModule);
const activateUserModule = () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule);
const resetPasswordModule = () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      // Public routes
      {
        // Logged out frontpage
        path: '',
        component: PublicLayoutComponent,
        canMatch: [LoggedOutGuard],
        canActivate: [LoggedOutGuard],
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
        // Association
        path: '',
        loadChildren: associationModule,
        canActivate: [LoggedInGuard]
      },
      {
        // Security
        path: 'security',
        loadChildren: securityModule,
        canActivate: [LoggedInGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
