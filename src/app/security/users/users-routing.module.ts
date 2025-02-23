import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { AccessUserCreationContainer } from './containers/access-user-creation/access-user-creation.container';
import { AccessUserEditionContainer } from './containers/access-user-edition/access-user-edition.container';
import { AccessListingContainer } from './containers/access-user-listing/access-user-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Usuarios' },
    children: [
      {
        path: '',
        component: AccessListingContainer,
        canActivate: [ResourceGuard("user", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'add',
        component: AccessUserCreationContainer,
        canActivate: [ResourceGuard("user", "create")],
        data: { breadcrumb: 'Registrar' }
      },
      {
        path: ':user',
        component: AccessUserEditionContainer,
        canActivate: [ResourceGuard("user", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }