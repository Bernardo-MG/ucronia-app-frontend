import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/layout/account-layout/account-layout.component';
import { NavigationSideMenuWrapperComponent } from './navigation/navigation-side-menu-wrapper/navigation-side-menu-wrapper.component';
import { LoggedInGuard } from './security/authentication/guard/logged-in.guard';
import { LoggedOutGuard } from './security/authentication/guard/logged-out.guard';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);

const adminModule = () => import('@app/admin/admin.module').then(m => m.AdminModule);

const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);

const loginModule = () => import('@app/security/login/login.module').then(m => m.LoginModule);
const roleModule = () => import('@app/security/data/roles/roles.module').then(m => m.RolesModule);
const userModule = () => import('@app/security/data/users/users.module').then(m => m.UsersModule);
const registerModule = () => import('@app/security/register/register.module').then(m => m.RegisterModule);

const memberModule = () => import('@app/admin/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/crud/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/crud/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
  // Security
  { path: 'login', loadChildren: loginModule, canActivate: [LoggedOutGuard] },
  {
    path: '', component: NavigationSideMenuWrapperComponent, children: [
      { path: '', loadChildren: frontpageModule },
      {
        path: 'security', children: [
          { path: 'roles', loadChildren: roleModule, canActivate: [LoggedInGuard] },
          { path: 'users', loadChildren: userModule, canActivate: [LoggedInGuard] },
          { path: 'register', loadChildren: registerModule, canActivate: [LoggedInGuard] }
        ]
      },
      // Admin
      {
        path: 'admin', children: [
          { path: '', loadChildren: adminModule, canActivate: [LoggedInGuard] }
        ]
      },
      {
        path: 'data', children: [
          { path: 'fees', loadChildren: feeModule, canActivate: [LoggedInGuard] },
          { path: 'transactions', loadChildren: transactionModule, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'members', loadChildren: memberModule, canActivate: [LoggedInGuard] }
    ]
  },
  // Account
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: '', loadChildren: accountModule, canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
