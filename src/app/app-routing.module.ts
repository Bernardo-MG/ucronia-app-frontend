import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { ResourceGuard } from './core/authentication/guards/resource.guard';
import { MainNavigationLayoutComponent } from './core/layout/components/main-navigation-layout/main-navigation-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const loginModule = () => import('@app/access/login/login.module').then(m => m.LoginModule);
const userModule = () => import('@app/access/users/users.module').then(m => m.UsersModule);
const userTokenModule = () => import('@app/access/user-tokens/user-tokens.module').then(m => m.UserTokensModule);
const rolesModule = () => import('@app/access/roles/roles.module').then(m => m.RolesModule);
const activateUserModule = () => import('@app/access/user-activation/user-activation.module').then(m => m.UserActivationModule);
const resetPasswordModule = () => import('@app/access/password-reset/password-reset.module').then(m => m.PasswordResetModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      {
        path: 'login',
        component: MainNavigationLayoutComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: loginModule
      },
      {
        path: 'password/reset',
        component: MainNavigationLayoutComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: resetPasswordModule
      },
      // Role
      {
        path: 'roles',
        component: MainNavigationLayoutComponent,
        loadChildren: rolesModule,
        canActivate: [ResourceGuard("role")]
      },
      // User
      {
        path: 'users',
        component: MainNavigationLayoutComponent,
        loadChildren: userModule,
        canActivate: [ResourceGuard("user")]
      },
      // User tokens
      {
        path: 'user-tokens',
        component: MainNavigationLayoutComponent,
        loadChildren: userTokenModule,
        canActivate: [ResourceGuard("user_token")]
      },
      // Activate user
      {
        path: 'users/activate',
        component: MainNavigationLayoutComponent,
        loadChildren: activateUserModule,
        canActivate: [LoggedOutGuard]
      },
      {
        path: '',
        component: MainNavigationLayoutComponent,
        canActivate: [LoggedInGuard],
        children: [
          // Association
          {
            path: '',
            children: [
              // Front page
              { path: '', loadChildren: frontpageModule },
              // Association
              { path: '', loadChildren: associationModule }
            ]
          },
          // Account
          {
            path: 'account',
            children: [
              { path: '', loadChildren: accountModule }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
