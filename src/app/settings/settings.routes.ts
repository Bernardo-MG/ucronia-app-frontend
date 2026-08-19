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
      }
    ]
  }
];
