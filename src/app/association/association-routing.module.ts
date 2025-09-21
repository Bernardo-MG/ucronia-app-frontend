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
        loadComponent: () => import('./activity-calendar/containers/activity-calendar-frontpage/activity-calendar-frontpage.container').then(m => m.ActivityCalendarFrontpageContainer)
      },
      {
        path: 'members',
        canActivate: [ResourceGuard("member", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./members/containers/member-list/member-list.container').then(m => m.MemberListContainer),
            canActivate: [ResourceGuard("member", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: ':number',
            loadComponent: () => import('./members/containers/member-info/member-info.container').then(m => m.MemberInfoContainer),
            canActivate: [ResourceGuard("member", "read")],
            data: { breadcrumb: 'Info' }
          }
        ]
      },
      {
        path: 'myFees',
        canActivate: [ResourceGuard("my_fees", "view")],
        loadComponent: () => import('./my-fees/containers/my-fees-list/my-fees-list.container').then(m => m.MyFeesFrontpageContainer)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library", "view")],
        children: [
          {
            path: '',
            loadComponent: () => import('./library/containers/library-list/library-list.container').then(m => m.LibraryListContainer),
            canActivate: [ResourceGuard("library", "view")],
            data: { breadcrumb: 'Libros' }
          },
          {
            path: 'games/:index',
            loadComponent: () => import('./library/containers/library-game-book-info/library-game-book-info.container').then(m => m.LibraryGameBookInfoContainer),
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Juego' }
          },
          {
            path: 'fiction/:index',
            loadComponent: () => import('./library/containers/library-fiction-book-info/library-fiction-book-info.container').then(m => m.LibraryFictionBookInfoContainer),
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Ficción' }
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
