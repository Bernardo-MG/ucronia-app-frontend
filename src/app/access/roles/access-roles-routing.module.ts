import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRoleCreateComponent } from './containers/access-role-create/access-role-create.component';
import { AccessRoleDetailsComponent } from './containers/access-role-details/access-role-details.component';
import { AccessRoleListComponent } from './containers/access-role-list/access-role-list.component';


const routes: Routes = [
  { path: '', component: AccessRoleListComponent },
  { path: 'create', component: AccessRoleCreateComponent },
  { path: ':id', component: AccessRoleDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoleRoutingModule { }