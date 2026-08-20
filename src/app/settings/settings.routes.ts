import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    canActivate: [ResourceGuard(UcroniaPermissions.associationSettings.read)],
    loadComponent: () => import('./settings-layout/settings-layout').then(m => m.SettingsLayout),
    children: [
      {
        path: '',
        redirectTo: 'properties',
        pathMatch: 'full'
      },
      {
        path: 'properties',
        loadComponent: () => import('./settings-view/settings-view').then(m => m.SettingsView)
      },
      {
        path: 'fee-types',
        canActivate: [ResourceGuard(UcroniaPermissions.feeType.read)],
        loadComponent: () => import('./fee-type-view/fee-type-view').then(m => m.FeeTypeView)
      },
      {
        path: 'keys',
        canActivate: [ResourceGuard(UcroniaPermissions.directory.memberProfile.read)],
        loadComponent: () => import('./key-view/key-view').then(m => m.KeyView)
      },
      {
        path: 'contact-methods',
        canActivate: [ResourceGuard(UcroniaPermissions.directory.contactMethod.read)],
        loadComponent: () => import('./contact-method-view/contact-method-view').then(m => m.ContactMethodView)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard(UcroniaPermissions.library.book.read)],
        children: [
          {
            path: 'author',
            loadComponent: () => import('./library/library-author-list-view/library-author-list-view').then(m => m.LibraryAuthorListView)
          },
          {
            path: 'publisher',
            loadComponent: () => import('./library/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView)
          },
          {
            path: 'system',
            loadComponent: () => import('./library/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView)
          },
          {
            path: 'type',
            loadComponent: () => import('./library/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView)
          }
        ]
      }
    ]
  }
];
