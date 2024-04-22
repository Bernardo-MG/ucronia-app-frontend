import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AccessRoleCreateComponent } from './components/views/access-role-create/access-role-create.component';
import { AccessRoleFrontpageComponent } from './components/views/access-role-frontpage/access-role-frontpage.component';
import { AccessRoleInfoEditorComponent } from './components/views/access-role-info-editor/access-role-info-editor.component';

const routes: Routes = [
  { path: '', component: AccessRoleFrontpageComponent },
  { path: 'add', component: AccessRoleCreateComponent, canActivate: [ResourceGuard("role", "create")] },
  { path: ':role', component: AccessRoleInfoEditorComponent, canActivate: [ResourceGuard("role", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }