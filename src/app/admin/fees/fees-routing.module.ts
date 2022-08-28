import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBalanceTransactionCreateViewComponent } from '../balance/views/admin-balance-transaction-create-view/admin-balance-transaction-create-view.component';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminFeeListViewComponent },
            { path: 'create', component: AdminBalanceTransactionCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }