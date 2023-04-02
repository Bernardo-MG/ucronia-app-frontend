import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCalendarViewComponent } from './containers/transaction-calendar-view/transaction-calendar-view.component';
import { TransactionCreateViewComponent } from './containers/transaction-create-view/transaction-create-view.component';
import { TransactionEditViewComponent } from './containers/transaction-edit-view/transaction-edit-view.component';
import { TransactionListViewComponent } from './containers/transaction-list-view/transaction-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TransactionCalendarViewComponent },
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