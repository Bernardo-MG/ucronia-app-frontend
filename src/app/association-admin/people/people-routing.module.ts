import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { PeopleCreationContainer } from './containers/people-creation/people-creation.container';
import { PeopleInfoEditionContainer } from './containers/people-edition/people-edition.container';
import { PeopleListingContainer } from './containers/people-listing/people-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Personas' },
    children: [
      {
        path: '',
        component: PeopleListingContainer,
        canActivate: [ResourceGuard("person", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'register',
        component: PeopleCreationContainer,
        canActivate: [ResourceGuard("person", "create")],
        data: { breadcrumb: 'Añadir' }
      },
      {
        path: ':number',
        component: PeopleInfoEditionContainer,
        canActivate: [ResourceGuard("person", "read")],
        data: { breadcrumb: 'Editar' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }