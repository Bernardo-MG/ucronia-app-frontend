import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const libraryRoutes: Routes = [
  {
    path: 'library',
    canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)],
    loadComponent: () => import('./library-layout/library-layout').then(m => m.LibraryLayout),
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
            canActivate: [ResourceGuard(UcroniaPermissions.library.author.read)]
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./book/library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)]
          }
        ]
      },
      {
        path: 'publishers',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.publisher.read)]
          }
        ]
      },
      {
        path: 'types',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.type.read)]
          }
        ]
      },
      {
        path: 'systems',
        children: [
          {
            path: '',
            loadComponent: () => import('./data/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.system.read)]
          }
        ]
      }
    ]
  }
];
