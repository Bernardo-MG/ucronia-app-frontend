import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const dashboardModule = () => import('@app/admin/dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule);
const balanceModule = () => import('@app/admin/balance/balance.module').then(m => m.BalanceModule);
const memberModule = () => import('@app/admin/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/admin/fees/fees.module').then(m => m.FeesModule);


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', loadChildren: dashboardModule },
            { path: 'member', loadChildren: memberModule },
            { path: 'balance', loadChildren: balanceModule },
            { path: 'fee', loadChildren: feeModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }