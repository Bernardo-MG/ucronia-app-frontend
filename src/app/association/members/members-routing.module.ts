import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { MemberInfoContainer } from './core/containers/member-info/member-info.container';
import { MemberListingContainer } from './core/containers/member-listing/member-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Socios' },
    children: [
          {
            path: '',
            component: MemberListingContainer,
            canActivate: [ResourceGuard("member", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: ':number',
            component: MemberInfoContainer,
            canActivate: [ResourceGuard("member", "read")],
            data: { breadcrumb: 'Info' }
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }