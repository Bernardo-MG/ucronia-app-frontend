import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameLayoutComponent } from '@app/core/layout/components/layout-main-frame/layout-main-frame.component';

const balanceModule = () => import('@app/association/balance/balance.module').then(m => m.BalanceModule);
const memberModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/association/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
    {
        path: '',
        component: MainFrameLayoutComponent,
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
export class AssociationRoutingModule { }