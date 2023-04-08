import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCalendarInfoComponent } from './containers/fee-calendar-info/fee-calendar-info.component';
import { FeeCreateComponent } from './containers/fee-create/fee-create.component';
import { FeeEditComponent } from './containers/fee-edit/fee-edit.component';
import { FeeListComponent } from './containers/fee-list/fee-list.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: FeeCalendarInfoComponent },
            { path: 'list', component: FeeListComponent },
            { path: 'calendar', component: FeeCalendarInfoComponent },
            { path: 'create', component: FeeCreateComponent },
            { path: ':id', component: FeeEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeesRoutingModule { }