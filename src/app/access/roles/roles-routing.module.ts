import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRoleCreateComponent } from './components/access-role-create/access-role-create.component';
import { AccessRoleDetailsComponent } from './components/access-role-details/access-role-details.component';
import { AccessFrontpageComponent } from './components/access-role-frontpage/access-role-frontpage.component';

const routes: Routes = [
  { path: '', component: AccessFrontpageComponent },
  { path: 'create', component: AccessRoleCreateComponent },
  { path: ':id', component: AccessRoleDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }