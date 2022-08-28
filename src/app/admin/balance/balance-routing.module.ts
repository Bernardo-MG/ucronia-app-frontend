import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBalanceTransactionCreateViewComponent } from './views/admin-balance-transaction-create-view/admin-balance-transaction-create-view.component';
import { AdminBalanceViewComponent } from './views/admin-balance-view/admin-balance-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminBalanceViewComponent },
            { path: 'create', component: AdminBalanceTransactionCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BalanceRoutingModule { }