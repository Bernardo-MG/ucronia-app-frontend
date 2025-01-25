import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AccessRoleCreationContainer } from './containers/access-role-creation/access-role-creation.container';
import { AccessRoleListingContainer } from './containers/access-role-listing/access-role-listing.container';
import { AccessRoleInfoEditionContainer } from './containers/access-role-edition/access-role-edition.container';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'roles' },
    children: [
      {
        path: '',
        component: AccessRoleListingContainer,
        canActivate: [ResourceGuard("role", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        component: AccessRoleCreationContainer,
        canActivate: [ResourceGuard("role", "create")],
        data: { breadcrumb: 'Registrar' }
      },
      {
        path: ':role',
        component: AccessRoleInfoEditionContainer,
        canActivate: [ResourceGuard("role", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }