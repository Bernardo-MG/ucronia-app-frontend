import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddedFrameComponent } from '@app/core/layout/components/padded-frame/padded-frame.component';
import { AccessRoleCreateComponent } from './components/access-role-create/access-role-create.component';
import { AccessRoleDetailsComponent } from './components/access-role-details/access-role-details.component';
import { AccessRoleListComponent } from './components/access-role-list/access-role-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaddedFrameComponent,
    children: [
      { path: '', component: AccessRoleListComponent },
      { path: 'create', component: AccessRoleCreateComponent },
      { path: ':id', component: AccessRoleDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }