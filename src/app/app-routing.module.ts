import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/components/layout/account-layout/account-layout.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { ResourceGuard } from './core/authentication/guards/resource.guard';
import { PublicLayoutComponent } from './core/layout/components/layout/public-layout/public-layout.component';
import { SidebarLayoutComponent } from './core/layout/components/layout/sidebar-layout/sidebar-layout.component';
import { SecurityLayoutComponent } from './access/layout/components/security-layout/security-layout.component';
import { AssociationLayoutComponent } from './association/layout/components/association-layout/association-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const loginModule = () => import('@app/access/login/login.module').then(m => m.LoginModule);
const userModule = () => import('@app/access/users/users.module').then(m => m.UsersModule);
const userTokenModule = () => import('@app/access/user-tokens/user-tokens.module').then(m => m.UserTokensModule);
const rolesModule = () => import('@app/access/roles/roles.module').then(m => m.RolesModule);
const activateUserModule = () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule);
const resetPasswordModule = () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule);
const securityAuditModule = () => import('@app/access/audit/audit.module').then(m => m.AuditModule);

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
      {
        // Logged in frontpage
        path: '',
        component: AssociationLayoutComponent,
        loadChildren: frontpageModule,
        canMatch: [LoggedInGuard],
        canActivate: [LoggedInGuard]
      },
      // Security
      {
        // Root
        path: 'security',
        component: SecurityLayoutComponent,
        loadChildren: userModule,
        canActivate: [ResourceGuard("user", "view")]
      },
      {
        // Roles
        path: 'roles',
        component: SecurityLayoutComponent,
        loadChildren: rolesModule,
        canActivate: [ResourceGuard("role", "view")]
      },
      {
        // Users
        path: 'users',
        component: SecurityLayoutComponent,
        loadChildren: userModule,
        canActivate: [ResourceGuard("user", "view")]
      },
      {
        // User tokens
        path: 'user-tokens',
        component: SecurityLayoutComponent,
        loadChildren: userTokenModule,
        canActivate: [ResourceGuard("user_token", "view")]
      },
      {
        // Security audit
        path: 'security/audit',
        component: SecurityLayoutComponent,
        loadChildren: securityAuditModule,
        canActivate: [ResourceGuard("user", "view")]
      },
      {
        // Account
        path: 'account',
        component: AccountLayoutComponent,
        loadChildren: accountModule,
        canActivate: [LoggedInGuard]
      },
      // Association
      {
        path: '',
        component: AssociationLayoutComponent,
        loadChildren: associationModule,
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
