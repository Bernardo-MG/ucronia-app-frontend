import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const associationRoutes: Routes = [
  {
    path: 'members',
    canActivate: [ResourceGuard('member', 'view')],
    loadComponent: () => import('./members/member-view/member-view').then(m => m.MemberView)
  },
  {
    path: 'myFees',
    canActivate: [ResourceGuard('my_fees', 'view')],
    loadComponent: () => import('./my-fees/my-fees-view/my-fees-view').then(m => m.MyFeesView)
  },
  {
    path: 'library',
    canActivate: [ResourceGuard('library', 'view')],
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
      },
      {
        path: 'authors',
        children: [
          {
            path: '',
            loadComponent: () => import('./library/data/library-author-list-view/library-author-list-view').then(m => m.LibraryAuthorListView),
            canActivate: [ResourceGuard('library_author', 'view')]
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./library/book/library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard('library_book', 'view')]
          }
        ]
      },
      {
        path: 'publishers',
        children: [
          {
            path: '',
            loadComponent: () => import('./library/data/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView),
            canActivate: [ResourceGuard('library_publisher', 'view')]
          }
        ]
      },
      {
        path: 'types',
        children: [
          {
            path: '',
            loadComponent: () => import('./library/data/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView),
            canActivate: [ResourceGuard('library_book_type', 'view')]
          }
        ]
      },
      {
        path: 'systems',
        children: [
          {
            path: '',
            loadComponent: () => import('./library/data/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView),
            canActivate: [ResourceGuard('library_game_system', 'view')]
          }
        ]
      }
    ]
  },
  {
    path: 'fees',
    canActivate: [ResourceGuard('fee', 'view')],
    loadComponent: () => import('./fees/fee-view/fee-view').then(m => m.FeeView)
  },
  {
    path: 'directory',
    canActivate: [ResourceGuard('profile', 'view')],
    loadComponent: () => import('./directory/directory-view/directory-view').then(m => m.DirectoryView)
  },
  {
    path: 'funds',
    canActivate: [ResourceGuard('funds', 'view')],
    loadComponent: () => import('./funds/funds-view/funds-view').then(m => m.FundsView)
  }
];
