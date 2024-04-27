import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const fundsModule = () => import('@app/association/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const userFeesModule = () => import('@app/association/user-fees/user-fees.module').then(m => m.UserFeesModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);
const libraryAdminModule = () => import('@app/association/library-admin/library-admin.module').then(m => m.LibraryAdminModule);
const configurationModule = () => import('@app/configuration/configuration.module').then(m => m.ConfigurationModule);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'funds',
        canActivate: [ResourceGuard("funds", "view")],
        loadChildren: fundsModule
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        loadChildren: membersModule
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("fee", "view")],
        loadChildren: feesModule
      },
      {
        path: 'myFees',
        canActivate: [ResourceGuard("user_fee", "view")],
        loadChildren: userFeesModule
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library", "view")],
        loadChildren: libraryModule
      },
      {
        path: 'library/admin',
        canActivate: [ResourceGuard("library_admin", "view")],
        loadChildren: libraryAdminModule
      },
      {
        path: 'configuration',
        canActivate: [ResourceGuard("association_configuration", "view")],
        loadChildren: configurationModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
