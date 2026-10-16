import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService, ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

import { librarySettingsOptions } from './settings/library-settings-permissions';
import { LibrarySettingsGuard } from './settings/library-settings.guard';

export const libraryRoutes: Routes = [
  {
    path: 'library',
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        canActivate: [LibrarySettingsGuard],
        loadComponent: () => import('./settings/library-settings-layout/library-settings-layout').then(m => m.LibrarySettingsLayout),
        children: [
          {
            path: '',
            redirectTo: () => {
              const authService = inject(AuthService);
              const option = librarySettingsOptions.find(option => authService.hasPermission(option.permission));
              return option ? `/association/library/settings/${option.path}` : '/';
            },
            pathMatch: 'full'
          },
          {
            path: 'author',
            canActivate: [ResourceGuard(UcroniaPermissions.library.author.read)],
            loadComponent: () => import('./settings/library-author-list-view/library-author-list-view').then(m => m.LibraryAuthorListView)
          },
          {
            path: 'publisher',
            canActivate: [ResourceGuard(UcroniaPermissions.library.publisher.read)],
            loadComponent: () => import('./settings/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView)
          },
          {
            path: 'system',
            canActivate: [ResourceGuard(UcroniaPermissions.library.system.read)],
            loadComponent: () => import('./settings/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView)
          },
          {
            path: 'type',
            canActivate: [ResourceGuard(UcroniaPermissions.library.type.read)],
            loadComponent: () => import('./settings/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView)
          }
        ]
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
