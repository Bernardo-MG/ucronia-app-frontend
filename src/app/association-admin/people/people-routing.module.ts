import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Personas' },
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/people-list/people-list.container').then(m => m.PeopleListingContainer),
        canActivate: [ResourceGuard("person", "read")],
        data: { breadcrumb: '' }
      },
      {
        path: 'register',
        loadComponent: () => import('./containers/people-creation/people-creation.container').then(m => m.PeopleCreationContainer),
        canActivate: [ResourceGuard("person", "create")],
        data: { breadcrumb: 'Añadir' }
      },
      {
        path: ':number',
        loadComponent: () => import('./containers/people-edition/people-edition.container').then(m => m.PeopleInfoEditionContainer),
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