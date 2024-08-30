import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { PublicMemberFrontpageComponent } from './views/components/public-member-frontpage/public-member-frontpage.component';
import { PublicMemberInfoEditorComponent } from './views/components/public-member-info-view/public-member-info-view.component';


const routes: Routes = [
  { path: '', component: PublicMemberFrontpageComponent, canActivate: [ResourceGuard("public_member", "read")] },
  { path: ':number', component: PublicMemberInfoEditorComponent, canActivate: [ResourceGuard("public_member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicMembersRoutingModule { }