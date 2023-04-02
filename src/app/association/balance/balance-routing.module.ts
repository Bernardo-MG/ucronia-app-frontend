import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBalanceViewComponent } from './containers/admin-balance-view/admin-balance-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminBalanceViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BalanceRoutingModule { }