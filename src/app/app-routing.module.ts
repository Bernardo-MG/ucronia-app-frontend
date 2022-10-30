import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './authentication/guard/logged-in.guard';
import { LoggedOutGuard } from './authentication/guard/logged-out.guard';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);

const loginModule = () => import('@app/security/login/login.module').then(m => m.LoginModule);
const securityModule = () => import('@app/security/security.module').then(m => m.SecurityModule);

const adminModule = () => import('@app/admin/admin.module').then(m => m.AdminModule);

const memberModule = () => import('@app/crud/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/crud/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/crud/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
  { path: '', loadChildren: frontpageModule },
  { path: 'security', loadChildren: securityModule, canActivate: [LoggedInGuard] },
  { path: 'admin', loadChildren: adminModule, canActivate: [LoggedInGuard] },
  { path: 'members', loadChildren: memberModule, canActivate: [LoggedInGuard] },
  { path: 'fees', loadChildren: feeModule, canActivate: [LoggedInGuard] },
  { path: 'transactions', loadChildren: transactionModule, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
