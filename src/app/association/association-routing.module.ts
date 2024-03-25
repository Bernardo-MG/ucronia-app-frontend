import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const fundsModule = () => import('@app/association/funds/funds.module').then(m => m.FundsModule);
const membershipModule = () => import('@app/association/membership/membership.module').then(m => m.MembershipModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);
const configurationModule = () => import('@app/association/configuration/configuration.module').then(m => m.ConfigurationModule);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'funds',
        canActivate: [ResourceGuard("funds")],
        loadChildren: fundsModule
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member")],
        loadChildren: membersModule
      },
      {
        path: 'membership',
        canActivate: [ResourceGuard("membership")],
        loadChildren: membershipModule
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library")],
        loadChildren: libraryModule
      },
      {
        path: 'configuration',
        canActivate: [ResourceGuard("association_configuration")],
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
