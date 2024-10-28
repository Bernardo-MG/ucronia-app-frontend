import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationAdminLayoutComponent } from '@app/core/layout/components/association-admin-layout/association-admin-layout.component';

const fundsModule = () => import('@app/association-admin/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association-admin/fees/fees.module').then(m => m.FeesModule);
const peopleModule = () => import('@app/association-admin/people/people.module').then(m => m.PeopleModule);
const libraryAdminModule = () => import('@app/association-admin/library-admin/library-admin.module').then(m => m.LibraryAdminModule);
const libraryLendModule = () => import('@app/association-admin/library-lending/library-lending.module').then(m => m.LibraryLendingModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationAdminLayoutComponent,
    children: [
      {
        path: 'people',
        canActivate: [ResourceGuard("person", "view")],
        loadChildren: peopleModule
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: libraryAdminModule
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
      },
      {
        path: 'library/lend',
        canActivate: [ResourceGuard("library_lending", "view")],
        loadChildren: libraryLendModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
