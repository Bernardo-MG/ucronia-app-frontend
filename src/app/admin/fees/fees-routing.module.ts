import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeeCreateViewComponent } from './views/admin-fee-create-view/admin-fee-create-view.component';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminFeeListViewComponent },
            { path: 'create', component: AdminFeeCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }