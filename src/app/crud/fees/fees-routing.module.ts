import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './views/free-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './views/free-list-view/fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: FeeListViewComponent },
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