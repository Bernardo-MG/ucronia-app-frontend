import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const dashboardModule = () => import('@app/admin/dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule);
const balanceModule = () => import('@app/admin/balance/balance.module').then(m => m.BalanceModule);
const feeModule = () => import('@app/admin/fees/admin-fees.module').then(m => m.AdminFeesModule);


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', loadChildren: dashboardModule },
            { path: 'balance', loadChildren: balanceModule },
            { path: 'fees', loadChildren: feeModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }