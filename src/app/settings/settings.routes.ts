import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService, ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { settingsOptions } from './settings-permissions';
import { SettingsGuard } from './settings.guard';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    canActivate: [SettingsGuard],
    loadComponent: () => import('./settings-layout/settings-layout').then(m => m.SettingsLayout),
    children: [
      {
        path: '',
        redirectTo: () => {
          const authService = inject(AuthService);
          const option = settingsOptions.find(option => authService.hasPermission(option.permission));
          return option ? `/settings/${option.path}` : '/';
        },
        pathMatch: 'full'
      },
      {
        path: 'properties',
        canActivate: [ResourceGuard(UcroniaPermissions.associationSettings.read)],
        loadComponent: () => import('./settings-view/settings-view').then(m => m.SettingsView)
      },
      {
        path: 'fee-types',
        canActivate: [ResourceGuard(UcroniaPermissions.feeType.read)],
        loadComponent: () => import('./fee-type-view/fee-type-view').then(m => m.FeeTypeView)
      },
      {
        path: 'game-tables',
        canActivate: [ResourceGuard(UcroniaPermissions.gameTable.read)],
        loadComponent: () => import('./game-table-view/game-table-view').then(m => m.GameTableView)
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
        children: [
          {
            path: 'author',
            canActivate: [ResourceGuard(UcroniaPermissions.library.author.read)],
            loadComponent: () => import('./library/library-author-list-view/library-author-list-view').then(m => m.LibraryAuthorListView)
          },
          {
            path: 'publisher',
            canActivate: [ResourceGuard(UcroniaPermissions.library.publisher.read)],
            loadComponent: () => import('./library/library-publisher-list-view/library-publisher-list-view').then(m => m.LibraryPublisherListView)
          },
          {
            path: 'system',
            canActivate: [ResourceGuard(UcroniaPermissions.library.system.read)],
            loadComponent: () => import('./library/library-game-system-list-view/library-game-system-list-view').then(m => m.LibraryGameSystemListView)
          },
          {
            path: 'type',
            canActivate: [ResourceGuard(UcroniaPermissions.library.type.read)],
            loadComponent: () => import('./library/library-book-type-list-view/library-book-type-list-view').then(m => m.LibraryBookTypeListView)
          }
        ]
      }
    ]
  }
];
