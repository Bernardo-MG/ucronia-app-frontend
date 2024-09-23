import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationLayoutComponent } from './layout/components/association-layout/association-layout.component';

const activityCalendarModule = () => import('@app/association/activity-calendar/activity-calendar.module').then(m => m.ActivityCalendarModule);
const fundsModule = () => import('@app/association/funds/funds.module').then(m => m.FundsModule);
const feesModule = () => import('@app/association/fees/fees.module').then(m => m.FeesModule);
const myFeesModule = () => import('@app/association/my-fees/my-fees.module').then(m => m.MyFeesModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const publicMembersModule = () => import('@app/association/public-members/public-members.module').then(m => m.PublicMembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);
const libraryAdminModule = () => import('@app/association/library-admin/library-admin.module').then(m => m.LibraryAdminModule);
const libraryLendModule = () => import('@app/association/library-lending/library-lending.module').then(m => m.LibraryLendingModule);
const settingsModule = () => import('@app/settings/settings.module').then(m => m.SettingsModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: activityCalendarModule
      },
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
        path: 'members/admin',
        canActivate: [ResourceGuard("member", "view")],
        loadChildren: membersModule
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("public_member", "view")],
        loadChildren: publicMembersModule
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("fee", "view")],
        loadChildren: feesModule
      },
      {
        path: 'myFees',
        canActivate: [ResourceGuard("my_fees", "view")],
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
        path: 'library/lend',
        canActivate: [ResourceGuard("library_lending", "view")],
        loadChildren: libraryLendModule
      },
      {
        path: 'configuration',
        canActivate: [ResourceGuard("association_configuration", "view")],
        loadChildren: settingsModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
