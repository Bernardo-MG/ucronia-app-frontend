import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { MemberFrontpageComponent } from './views/components/member-frontpage/member-frontpage.component';
import { MemberInfoEditorComponent } from './views/components/member-info-view/member-info-view.component';


const routes: Routes = [
  { path: '', component: MemberFrontpageComponent, canActivate: [ResourceGuard("member", "read")] },
  { path: ':number', component: MemberInfoEditorComponent, canActivate: [ResourceGuard("member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }