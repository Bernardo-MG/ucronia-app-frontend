import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const libraryRoutes: Routes = [
  {
    path: 'library',
    canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)],
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
            loadComponent: () => import('./library-view/library-view').then(m => m.LibraryView),
            canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)]
          }
        ]
      }
    ]
  }
];
