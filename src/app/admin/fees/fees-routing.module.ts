import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeeEditViewComponent } from './views/admin-fee-edit-view/admin-fee-edit-view.component';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminFeeListViewComponent },
            { path: 'update', component: AdminFeeEditViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }