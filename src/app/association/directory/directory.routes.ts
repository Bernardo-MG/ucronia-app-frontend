import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const directoryRoutes: Routes = [
  {
    path: 'directory',
    canActivate: [ResourceGuard('profile', 'view')],
    loadComponent: () => import('./directory-view/directory-view').then(m => m.DirectoryView)
  }
];
