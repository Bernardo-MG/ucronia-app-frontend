import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { MemberCreateComponent } from './views/components/member-create/member-create.component';
import { MemberFrontpageComponent } from './views/components/member-frontpage/member-frontpage.component';
import { MemberInfoEditorComponent } from './views/components/member-info-editor/member-info-editor.component';
import { PublicMemberFrontpageComponent } from './views/components/public-member-frontpage/public-member-frontpage.component';


const routes: Routes = [
  { path: '', component: PublicMemberFrontpageComponent, canActivate: [ResourceGuard("public_member", "read")] },
  { path: 'admin', component: MemberFrontpageComponent, canActivate: [ResourceGuard("member", "read")] },
  { path: 'register', component: MemberCreateComponent, canActivate: [ResourceGuard("member", "create")] },
  { path: ':number', component: MemberInfoEditorComponent, canActivate: [ResourceGuard("member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }