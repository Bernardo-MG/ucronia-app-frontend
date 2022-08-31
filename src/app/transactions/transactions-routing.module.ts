import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCreateViewComponent } from './views/transaction-create-view/transaction-create-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'create', component: TransactionCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }