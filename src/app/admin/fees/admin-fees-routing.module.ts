import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeeYearViewComponent } from './views/admin-fee-year-view/admin-fee-year-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminFeeYearViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminFeesRoutingModule { }