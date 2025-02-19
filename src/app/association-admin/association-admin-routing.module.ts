import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationAdminLayoutContainer } from '@app/core/layout/containers/association-admin-layout/association-admin-layout.container';
import { SimpleLayoutContainer } from '@app/core/layout/containers/simple-layout/simple-layout.container';

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
        component: SimpleLayoutContainer,
        canActivate: [ResourceGuard("person", "view")],
        loadChildren: peopleModule
      },
      {
        path: 'library',
        component: AssociationAdminLayoutContainer,
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: libraryAdminModule
      },
      {
        path: 'fees',
        component: AssociationAdminLayoutContainer,
        canActivate: [ResourceGuard("fee", "view")],
        loadChildren: feesModule
      },
      {
        path: 'funds',
        component: AssociationAdminLayoutContainer,
        canActivate: [ResourceGuard("funds", "view")],
        loadChildren: fundsModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
