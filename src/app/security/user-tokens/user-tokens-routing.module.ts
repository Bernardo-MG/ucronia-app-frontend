import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UserTokenListingContainer } from './containers/user-token-listing/user-token-listing.container';
import { UserTokenEditionContainer } from './containers/user-token-edition/user-token-edition.container';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Tokens de usuario' },
    children: [
      {
        path: '',
        component: UserTokenListingContainer,
        canActivate: [ResourceGuard("user_token", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: ':token',
        component: UserTokenEditionContainer,
        canActivate: [ResourceGuard("user_token", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }