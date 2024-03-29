import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberFrontpageComponent } from './components/member-frontpage/member-frontpage.component';
import { MemberInfoEditorComponent } from './components/member-info-editor/member-info-editor.component';


const routes: Routes = [
  { path: '', component: MemberFrontpageComponent },
  { path: 'register', component: MemberCreateComponent },
  { path: ':number', component: MemberInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }