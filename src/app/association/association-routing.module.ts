import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';

const memberModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const feeModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
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
                path: 'members',
                canActivate: [ResourceGuard("member")],
                loadChildren: memberModule
            },
            {
                path: 'fees',
                canActivate: [ResourceGuard("fee")],
                loadChildren: feeModule
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
