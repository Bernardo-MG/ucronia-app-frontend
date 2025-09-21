import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'people',
        canActivate: [ResourceGuard("person", "view")],
        loadComponent: () => import('./people/core/people-list/people-list').then(m => m.PeopleList)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: () => import('@app/association-admin/library-admin/library-admin.module').then(m => m.LibraryAdminModule)
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("fee", "view")],
        loadComponent: () => import('./fees/core/fee-list/fee-list').then(m => m.FeeList)
      },
      {
        path: 'funds',
        canActivate: [ResourceGuard("funds", "view")],
        loadComponent: () => import('./funds/core/funds/funds').then(m => m.Funds)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
