import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminFeeListViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }