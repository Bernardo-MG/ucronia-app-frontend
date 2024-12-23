import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { UserTokenListingContainer } from './containers/user-token-listing/user-token-listing.container';
import { UserTokenEditionContainer } from './containers/user-token-edition/user-token-edition.container';

const routes: Routes = [
  { path: '', component: UserTokenListingContainer },
  { path: ':token', component: UserTokenEditionContainer, canActivate: [ResourceGuard("user_token", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }