import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessUserCreateViewComponent } from './containers/access-user-create-view/access-user-create-view.component';
import { AccessUserEditViewComponent } from './containers/access-user-edit-view/access-user-edit-view.component';
import { AccessUserListViewComponent } from './containers/access-user-list-view/access-user-list-view.component';


const routes: Routes = [
    { path: '', component: AccessUserListViewComponent },
    { path: 'create', component: AccessUserCreateViewComponent },
    { path: ':id', component: AccessUserEditViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessUserRoutingModule { }