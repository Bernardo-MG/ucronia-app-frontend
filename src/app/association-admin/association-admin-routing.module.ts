import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ResourceGuard } from '@bernardo-mg/authentication';

const fundsModule = () => import('@app/association-admin/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association-admin/fees/fees.module').then(m => m.FeesModule);
const peopleModule = () => import('@app/association-admin/people/people.module').then(m => m.PeopleModule);
const libraryAdminModule = () => import('@app/association-admin/library-admin/library-admin.module').then(m => m.LibraryAdminModule);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'people',
        loadComponent: () => import('@app/core/layout/components/simple-layout/simple-layout.component').then(m => m.SimpleLayoutComponent),
        canActivate: [ResourceGuard("person", "view")],
        loadChildren: peopleModule
      },
      {
        path: 'library',
        loadComponent: () => import('@app/association-admin/library-admin/layout/containers/association-admin-library-layout/association-admin-library-layout.container').then(m => m.AssociationAdminLibraryLayoutContainer),
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: libraryAdminModule
      },
      {
        path: 'money',
        loadComponent: () => import('@app/association-admin/fees/layout/containers/association-admin-fees-layout/association-admin-fees-layout.container').then(m => m.AssociationAdminFeesLayoutContainer),
        children: [
          {
            path: '',
            redirectTo: 'funds',
            pathMatch: 'full'
          },
          {
            path: 'fees',
            canActivate: [ResourceGuard("fee", "view")],
            loadChildren: feesModule
          },
          {
            path: 'funds',
            canActivate: [ResourceGuard("funds", "view")],
            loadChildren: fundsModule
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
