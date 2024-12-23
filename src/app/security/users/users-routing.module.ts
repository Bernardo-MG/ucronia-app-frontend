import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AccessUserCreationContainer } from './containers/access-user-creation/access-user-creation.container';
import { AccessListingContainer } from './containers/access-user-listing/access-user-listing.container';
import { AccessUserEditionContainer } from './containers/access-user-edition/access-user-edition.container';


const routes: Routes = [
  { path: '', component: AccessListingContainer },
  { path: 'add', component: AccessUserCreationContainer, canActivate: [ResourceGuard("user", "create")] },
  { path: ':user', component: AccessUserEditionContainer, canActivate: [ResourceGuard("user", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }