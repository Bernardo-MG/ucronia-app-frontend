import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardViewComponent } from './views/admin-dashboard-view/admin-dashboard-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminDashboardViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }