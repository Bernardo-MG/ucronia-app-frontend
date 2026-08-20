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
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () => import('./book/library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)]
          }
        ]
      }
    ]
  }
];
