import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationLayoutComponent } from './layout/components/association-layout/association-layout.component';

const activityCalendarModule = () => import('@app/association/activity-calendar/activity-calendar.module').then(m => m.ActivityCalendarModule);
const fundsModule = () => import('@app/association/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const myFeesModule = () => import('@app/association/my-fees/my-fees.module').then(m => m.MyFeesModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);
const libraryAdminModule = () => import('@app/association/library-admin/library-admin.module').then(m => m.LibraryAdminModule);
const configurationModule = () => import('@app/configuration/configuration.module').then(m => m.ConfigurationModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationLayoutComponent,
    children: [
      {
        path: 'calendar',
        canActivate: [ResourceGuard("activity_calendar", "view")],
        loadChildren: activityCalendarModule
      },
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
        loadChildren: myFeesModule
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
