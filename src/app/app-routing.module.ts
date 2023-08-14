import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/components/account-layout/account-layout.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { NavbarBodyComponent } from './core/layout/components/navbar-body/navbar-body.component';

const loginModule = () => import('@app/login/login.module').then(m => m.LoginModule);
const resetPasswordModule = () => import('@app/password-reset/password-reset.module').then(m => m.PasswordResetModule);
const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Main app
  {
    path: '',
    children: [
      {
        path: 'login',
        component: NavbarBodyComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: loginModule
      },
      {
        path: 'password/reset',
        component: NavbarBodyComponent,
        canActivate: [LoggedOutGuard],
        loadChildren: resetPasswordModule
      },
      {
        path: '',
        component: NavbarBodyComponent,
        canActivate: [LoggedInGuard],
        children: [
          // Association
          {
            path: '',
            children: [
              // Front page
              { path: '', loadChildren: frontpageModule },
              // Association
              { path: '', loadChildren: associationModule },
              // Security
              { path: 'security', loadChildren: accessModule }
            ]
          },
          // Account
          {
            path: 'account',
            component: AccountLayoutComponent,
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
