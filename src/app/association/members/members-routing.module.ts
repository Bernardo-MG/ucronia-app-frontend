import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';




const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Socios' },
    children: [
          {
            path: '',
            loadComponent: () => import('./containers/member-listing/member-listing.container').then(m => m.MemberListingContainer),
            canActivate: [ResourceGuard("member", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: ':number',
            loadComponent: () => import('./containers/member-info/member-info.container').then(m => m.MemberInfoContainer),
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