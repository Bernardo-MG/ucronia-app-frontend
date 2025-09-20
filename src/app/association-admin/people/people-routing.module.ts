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
        loadComponent: () => import('./containers/people-list/people-list').then(m => m.PeopleList),
        canActivate: [ResourceGuard("person", "read")],
        data: { breadcrumb: '' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }