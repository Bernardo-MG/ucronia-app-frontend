import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    canActivate: [ResourceGuard('association_settings', 'view')],
    loadComponent: () => import('./settings-view/settings-view').then(m => m.SettingsView)
  }
];
