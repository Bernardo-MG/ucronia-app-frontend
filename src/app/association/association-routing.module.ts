import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { AssociationLayoutComponent } from '../core/layout/components/association-layout/association-layout.component';

const activityCalendarModule = () => import('@app/association/activity-calendar/activity-calendar.module').then(m => m.ActivityCalendarModule);
const myFeesModule = () => import('@app/association/my-fees/my-fees.module').then(m => m.MyFeesModule);
const membersModule = () => import('@app/association/members/members.module').then(m => m.MembersModule);
const libraryModule = () => import('@app/association/library/library.module').then(m => m.LibraryModule);
const libraryLendModule = () => import('@app/association/library-lending/library-lending.module').then(m => m.LibraryLendingModule);

const routes: Routes = [
  {
    path: '',
    component: AssociationLayoutComponent,
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
        canActivate: [ResourceGuard("public_member", "view")],
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
export class AssociationRoutingModule { }
