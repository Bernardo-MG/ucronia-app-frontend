import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessUserCreateComponent } from './containers/access-user-create/access-user-create.component';
import { AccessUserEditComponent } from './containers/access-user-edit/access-user-edit.component';
import { AccessUserListComponent } from './containers/access-user-list/access-user-list.component';


const routes: Routes = [
    { path: '', component: AccessUserListComponent },
    { path: 'create', component: AccessUserCreateComponent },
    { path: ':id', component: AccessUserEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessUserRoutingModule { }