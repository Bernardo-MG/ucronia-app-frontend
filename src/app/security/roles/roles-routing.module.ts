import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AccessRoleCreationContainer } from './containers/access-role-creation/access-role-creation.container';
import { AccessRoleListingContainer } from './containers/access-role-listing/access-role-listing.container';
import { AccessRoleInfoEditionContainer } from './containers/access-role-edition/access-role-edition.container';

const routes: Routes = [
  { path: '', component: AccessRoleListingContainer },
  { path: 'add', component: AccessRoleCreationContainer, canActivate: [ResourceGuard("role", "create")] },
  { path: ':role', component: AccessRoleInfoEditionContainer, canActivate: [ResourceGuard("role", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }