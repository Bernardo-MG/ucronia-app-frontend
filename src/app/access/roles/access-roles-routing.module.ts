import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRoleCreateViewComponent } from './containers/access-role-create-view/access-role-create-view.component';
import { AccessRoleEditViewComponent } from './containers/access-role-edit-view/access-role-edit-view.component';
import { AccessRoleListViewComponent } from './containers/access-role-list-view/access-role-list-view.component';


const routes: Routes = [
  { path: '', component: AccessRoleListViewComponent },
  { path: 'create', component: AccessRoleCreateViewComponent },
  { path: ':id', component: AccessRoleEditViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoleRoutingModule { }