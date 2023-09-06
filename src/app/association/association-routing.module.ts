import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const statsModule = () => import('@app/association/stats/association-stats.module').then(m => m.AssociationStatsModule);
const memberModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const transactionModule = () => import('@app/association/transactions/transactions.module').then(m => m.TransactionsModule);
const configurationModule = () => import('@app/association/configuration/configuration.module').then(m => m.ConfigurationModule);

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'stats',
                canActivate: [ResourceGuard("stats")],
                loadChildren: statsModule
            },
            {
                path: 'transactions',
                canActivate: [ResourceGuard("transaction")],
                loadChildren: transactionModule
            },
            {
                path: 'members',
                canActivate: [ResourceGuard("member")],
                loadChildren: memberModule
            },
            {
                path: 'fees',
                canActivate: [ResourceGuard("fee")],
                loadChildren: feeModule
            },
            {
                path: 'configuration',
                canActivate: [ResourceGuard("association_configuration")],
                loadChildren: configurationModule
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
