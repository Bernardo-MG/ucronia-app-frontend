import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/containers/association-layout/association-layout.container').then(m => m.AssociationLayoutContainer),
    children: [
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'prefix'
      },
      {
        path: 'activity',
        canActivate: [ResourceGuard("activity_calendar", "view")],
        loadChildren: () => import('@app/association/activity-calendar/activity-calendar.module').then(m => m.ActivityCalendarModule)
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        loadChildren: () => import('@app/association/members/members.module').then(m => m.MembersModule)
      },
      {
        path: 'myFees',
        canActivate: [ResourceGuard("my_fees", "view")],
        loadChildren: () => import('@app/association/my-fees/my-fees.module').then(m => m.MyFeesModule)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library", "view")],
        loadChildren: () => import('@app/association/library/library.module').then(m => m.LibraryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
