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
      }
    ]
  }
];
