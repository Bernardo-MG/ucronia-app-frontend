import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { MemberInfoComponent } from './core/containers/member-info/member-info.component';
import { MemberListingComponent } from './core/containers/member-listing/member-listing.component';


const routes: Routes = [
  { path: '', component: MemberListingComponent, canActivate: [ResourceGuard("member", "read")] },
  { path: ':number', component: MemberInfoComponent, canActivate: [ResourceGuard("member", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }