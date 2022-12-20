import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeeYearViewComponent } from './views/admin-fee-year-view/admin-fee-year-view.component';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './views/fee-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: FeeListViewComponent },
            { path: 'list', component: FeeListViewComponent },
            { path: 'year', component: AdminFeeYearViewComponent },
            { path: 'create', component: FeeCreateViewComponent },
            { path: ':id', component: FeeEditViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }