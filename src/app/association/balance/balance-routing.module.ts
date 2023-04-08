import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceInfoComponent } from './containers/balance-info/balance-info.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: BalanceInfoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BalanceRoutingModule { }