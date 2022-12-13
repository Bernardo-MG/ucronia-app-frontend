import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const balanceModule = () => import('@app/admin/balance/balance.module').then(m => m.BalanceModule);

const memberModule = () => import('@app/admin/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/admin/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/admin/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'balance', loadChildren: balanceModule },
            { path: 'transactions', loadChildren: transactionModule },
            { path: 'members', loadChildren: memberModule },
            { path: 'fees', loadChildren: feeModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }