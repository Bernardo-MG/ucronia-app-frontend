import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/core/layout/components/association-layout/association-layout').then(m => m.AssociationLayout),
    children: [
      {
        path: 'people',
        canActivate: [ResourceGuard("person", "view")],
        loadChildren: () => import('@app/association-admin/people/people.module').then(m => m.PeopleModule)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: () => import('@app/association-admin/library-admin/library-admin.module').then(m => m.LibraryAdminModule)
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("fee", "view")],
        loadChildren: () => import('@app/association-admin/fees/fees.module').then(m => m.FeesModule)
      },
      {
        path: 'funds',
        canActivate: [ResourceGuard("funds", "view")],
        loadChildren: () => import('@app/association-admin/funds/funds.module').then(m => m.FundsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
