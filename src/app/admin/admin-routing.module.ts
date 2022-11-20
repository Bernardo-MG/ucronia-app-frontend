import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const balanceModule = () => import('@app/admin/balance/balance.module').then(m => m.BalanceModule);
const feeModule = () => import('@app/admin/fees/admin-fees.module').then(m => m.AdminFeesModule);
const memberModule = () => import('@app/admin/members/admin-members.module').then(m => m.AdminMembersModule);


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'balance', loadChildren: balanceModule },
            { path: 'fees', loadChildren: feeModule },
            { path: 'members', loadChildren: memberModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }