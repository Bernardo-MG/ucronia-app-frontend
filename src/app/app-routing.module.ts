import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './security/authentication/guard/logged-in.guard';
import { LoggedOutGuard } from './security/authentication/guard/logged-out.guard';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);

const adminModule = () => import('@app/admin/admin.module').then(m => m.AdminModule);

const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);

const loginModule = () => import('@app/security/login/login.module').then(m => m.LoginModule);
const roleModule = () => import('@app/security/data/roles/roles.module').then(m => m.RolesModule);
const userModule = () => import('@app/security/data/users/users.module').then(m => m.UsersModule);
const registerModule = () => import('@app/security/register/register.module').then(m => m.RegisterModule);
const passwordModule = () => import('@app/security/password/password.module').then(m => m.PasswordModule);

const memberModule = () => import('@app/crud/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/crud/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/crud/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
  { path: '', loadChildren: frontpageModule },
  // Security
  { path: 'login', loadChildren: loginModule, canActivate: [LoggedOutGuard] },
  { path: 'security/roles', loadChildren: roleModule, canActivate: [LoggedInGuard] },
  { path: 'security/users', loadChildren: userModule, canActivate: [LoggedInGuard] },
  { path: 'security/register', loadChildren: registerModule, canActivate: [LoggedInGuard] },
  { path: 'security/password', loadChildren: passwordModule, canActivate: [LoggedInGuard] },
  // Admin
  { path: 'admin', loadChildren: adminModule, canActivate: [LoggedInGuard] },
  { path: 'members', loadChildren: memberModule, canActivate: [LoggedInGuard] },
  { path: 'fees', loadChildren: feeModule, canActivate: [LoggedInGuard] },
  { path: 'transactions', loadChildren: transactionModule, canActivate: [LoggedInGuard] },
  // Account
  { path: 'account', loadChildren: accountModule, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
