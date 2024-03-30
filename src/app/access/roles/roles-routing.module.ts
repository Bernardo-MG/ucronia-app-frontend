import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRoleCreateComponent } from './components/access-role-create/access-role-create.component';
import { AccessRoleInfoEditorComponent } from './components/access-role-info-editor/access-role-info-editor.component';
import { AccessFrontpageComponent } from './components/access-role-frontpage/access-role-frontpage.component';

const routes: Routes = [
  { path: '', component: AccessFrontpageComponent },
  { path: 'add', component: AccessRoleCreateComponent },
  { path: ':role', component: AccessRoleInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }