import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCalendarViewComponent } from './views/fee-calendar-view/fee-calendar-view.component';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './views/fee-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: FeeCalendarViewComponent },
            { path: 'list', component: FeeListViewComponent },
            { path: 'calendar', component: FeeCalendarViewComponent },
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