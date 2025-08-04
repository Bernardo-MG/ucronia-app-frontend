import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Tokens de usuario' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/user-token-listing/user-token-listing.container').then(m => m.UserTokenListingContainer),
        canActivate: [ResourceGuard("user_token", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: ':token',
        loadComponent: () => import('./containers/user-token-edition/user-token-edition.container').then(m => m.UserTokenEditionContainer),
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