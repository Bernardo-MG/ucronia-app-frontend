import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    canActivate: [ResourceGuard('ASSOCIATION_SETTINGS', 'VIEW')],
    loadComponent: () => import('./settings-view/settings-view').then(m => m.SettingsView)
  }
];
