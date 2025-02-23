import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { AssociationLayoutContainer } from '../core/layout/containers/association-layout/association-layout.container';

const activityCalendarModule = () => import('@app/association/activity-calendar/activity-calendar.module').then(m => m.ActivityCalendarModule);
const myFeesModule = () => import('@app/association/my-fees/my-fees.module').then(m => m.MyFeesModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationLayoutContainer,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'prefix'
      },
      {
        path: 'calendar',
        canActivate: [ResourceGuard("activity_calendar", "view")],
        loadChildren: activityCalendarModule
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        loadChildren: membersModule
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
