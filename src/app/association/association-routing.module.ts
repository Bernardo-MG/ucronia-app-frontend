import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'prefix'
      },
      {
        path: 'activity',
        canActivate: [ResourceGuard("activity_calendar", "view")],
        loadComponent: () => import('./activity-calendar/activity-calendar/activity-calendar').then(m => m.ActivityCalendar)
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        loadComponent: () => import('./members/member-list/member-list').then(m => m.MemberList)
      },
      {
        path: 'myFees',
        canActivate: [ResourceGuard("my_fees", "view")],
        loadComponent: () => import('./my-fees/my-fees-list/my-fees-list').then(m => m.MyFeesList)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./library/library-list/library-list').then(m => m.LibraryList),
            canActivate: [ResourceGuard("library", "view")]
          },
          {
            path: 'games/:index',
            loadComponent: () => import('./library/library-game-book-info/library-game-book-info').then(m => m.LibraryGameBookInfo),
            canActivate: [ResourceGuard("library_book", "read")]
          },
          {
            path: 'fiction/:index',
            loadComponent: () => import('./library/library-fiction-book-info/library-fiction-book-info').then(m => m.LibraryFictionBookInfo),
            canActivate: [ResourceGuard("library_book", "read")]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
