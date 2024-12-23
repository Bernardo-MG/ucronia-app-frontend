import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { MemberInfoContainer } from './core/containers/member-info/member-info.container';
import { MemberListingContainer } from './core/containers/member-listing/member-listing.container';


const routes: Routes = [
  { path: '', component: MemberListingContainer, canActivate: [ResourceGuard("member", "read")] },
  { path: ':number', component: MemberInfoContainer, canActivate: [ResourceGuard("member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }