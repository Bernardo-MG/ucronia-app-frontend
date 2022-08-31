import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'create', component: FeeCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }