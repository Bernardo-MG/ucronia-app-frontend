import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const balanceModule = () => import('@app/admin/balance/balance.module').then(m => m.BalanceModule);
const feeModule = () => import('@app/admin/fees/fees.module').then(m => m.FeesModule);


const routes: Routes = [
    {
        path: '',
        children: [
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