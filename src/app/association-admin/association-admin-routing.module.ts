import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationAdminLayoutComponent } from '@app/core/layout/components/association-admin-layout/association-admin-layout.component';

const fundsModule = () => import('@app/association-admin/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association-admin/fees/fees.module').then(m => m.FeesModule);
const membersModule = () => import('@app/association-admin/members/members.module').then(m => m.MembersModule);
const libraryAdminModule = () => import('@app/association-admin/library-admin/library-admin.module').then(m => m.LibraryAdminModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationAdminLayoutComponent,
    children: [
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        loadChildren: membersModule
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
