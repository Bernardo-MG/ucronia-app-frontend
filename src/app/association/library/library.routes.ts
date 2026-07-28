import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const libraryRoutes: Routes = [
  {
    path: 'library',
    canActivate: [ResourceGuard('LIBRARY', 'VIEW')],
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
            canActivate: [ResourceGuard('LIBRARY_AUTHOR', 'VIEW')]
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./book/library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard('LIBRARY_BOOK', 'VIEW')]
          }
        ]
      },
      {
        path: 'publishers',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView),
            canActivate: [ResourceGuard('LIBRARY_PUBLISHER', 'VIEW')]
          }
        ]
      },
      {
        path: 'types',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView),
            canActivate: [ResourceGuard('LIBRARY_BOOK_TYPE', 'VIEW')]
          }
        ]
      },
      {
        path: 'systems',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView),
            canActivate: [ResourceGuard('LIBRARY_GAME_SYSTEM', 'VIEW')]
          }
        ]
      }
    ]
  }
];
