import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const statsModule = () => import('@app/association/stats/association-stats.module').then(m => m.AssociationStatsModule);
const memberModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/association/transactions/transactions.module').then(m => m.TransactionsModule);

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'stats', loadChildren: statsModule },
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