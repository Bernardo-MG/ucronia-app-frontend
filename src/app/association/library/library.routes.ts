import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const libraryRoutes: Routes = [
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
            loadComponent: () => import('./data/library-author-list-view/library-author-list-view').then(m => m.LibraryAuthorListView),
            canActivate: [ResourceGuard('library_author', 'view')]
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./book/library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard('library_book', 'view')]
          }
        ]
      },
      {
        path: 'publishers',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView),
            canActivate: [ResourceGuard('library_publisher', 'view')]
          }
        ]
      },
      {
        path: 'types',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView),
            canActivate: [ResourceGuard('library_book_type', 'view')]
          }
        ]
      },
      {
        path: 'systems',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView),
            canActivate: [ResourceGuard('library_game_system', 'view')]
          }
        ]
      }
    ]
  }
];
