import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationAdminFeesLayoutContainer } from '@app/association-admin/fees/layout/containers/association-admin-fees-layout/association-admin-fees-layout.container';
import { AssociationAdminLibraryLayoutContainer } from '@app/association-admin/library-admin/layout/containers/association-admin-library-layout/association-admin-library-layout.container';
import { SimpleLayoutComponent } from '@app/core/layout/components/simple-layout/simple-layout.component';
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
        component: SimpleLayoutComponent,
        canActivate: [ResourceGuard("person", "view")],
        loadChildren: peopleModule
      },
      {
        path: 'library',
        component: AssociationAdminLibraryLayoutContainer,
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: libraryAdminModule
      },
      {
        path: 'money',
        component: AssociationAdminFeesLayoutContainer,
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
