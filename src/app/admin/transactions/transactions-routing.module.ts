import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCalendarViewComponent } from './views/transaction-calendar-view/transaction-calendar-view.component';
import { TransactionCreateViewComponent } from './views/transaction-create-view/transaction-create-view.component';
import { TransactionEditViewComponent } from './views/transaction-edit-view/transaction-edit-view.component';
import { TransactionListViewComponent } from './views/transaction-list-view/transaction-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TransactionListViewComponent },
            { path: 'list', component: TransactionListViewComponent },
            { path: 'calendar', component: TransactionCalendarViewComponent },
            { path: 'create', component: TransactionCreateViewComponent },
            { path: ':id', component: TransactionEditViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }