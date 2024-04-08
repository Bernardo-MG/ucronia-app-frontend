import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessUserCreateComponent } from './components/views/access-user-create/access-user-create.component';
import { AccessFrontpageComponent } from './components/views/access-user-frontpage/access-user-frontpage.component';
import { AccessUserInfoEditorComponent } from './components/views/access-user-info-editor/access-user-info-editor.component';


const routes: Routes = [
  { path: '', component: AccessFrontpageComponent },
  { path: 'add', component: AccessUserCreateComponent },
  { path: ':user', component: AccessUserInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }