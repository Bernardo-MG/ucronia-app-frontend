import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const membershipModule = () => import('@app/association/membership/membership.module').then(m => m.MembershipModule);
const feesModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const fundsModule = () => import('@app/association/funds/funds.module').then(m => m.FundsModule);
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
        path: 'membership',
        canActivate: [ResourceGuard("membership")],
        loadChildren: membershipModule
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("membership")],
        loadChildren: feesModule
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
