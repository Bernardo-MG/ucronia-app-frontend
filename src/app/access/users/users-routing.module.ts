import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityUserCreateViewComponent } from './containers/security-user-create-view/security-user-create-view.component';
import { SecurityUserEditViewComponent } from './containers/security-user-edit-view/security-user-edit-view.component';
import { SecurityUserListViewComponent } from './containers/security-user-list-view/security-user-list-view.component';


const routes: Routes = [
    { path: '', component: SecurityUserListViewComponent },
    { path: 'create', component: SecurityUserCreateViewComponent },
    { path: ':id', component: SecurityUserEditViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }