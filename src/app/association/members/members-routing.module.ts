import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { MemberCreateComponent } from './components/views/member-create/member-create.component';
import { MemberFrontpageComponent } from './components/views/member-frontpage/member-frontpage.component';
import { MemberInfoEditorComponent } from './components/views/member-info-editor/member-info-editor.component';


const routes: Routes = [
  { path: '', component: MemberFrontpageComponent },
  { path: 'register', component: MemberCreateComponent, canActivate: [ResourceGuard("member", "create")] },
  { path: ':number', component: MemberInfoEditorComponent, canActivate: [ResourceGuard("member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }