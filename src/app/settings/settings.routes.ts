import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    canActivate: [ResourceGuard(UcroniaPermissions.associationSettings.read)],
    loadComponent: () => import('./settings-view/settings-view').then(m => m.SettingsView)
  }
];
