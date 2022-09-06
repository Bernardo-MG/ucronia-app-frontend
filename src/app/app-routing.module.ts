import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const adminModule = () => import('@app/admin/admin.module').then(m => m.AdminModule);
const memberModule = () => import('@app/crud/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/crud/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/crud/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
  { path: '', loadChildren: frontpageModule },
  { path: 'admin', loadChildren: adminModule },
  { path: 'members', loadChildren: memberModule },
  { path: 'fees', loadChildren: feeModule },
  { path: 'transactions', loadChildren: transactionModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
