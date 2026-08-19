import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const directoryRoutes: Routes = [
  {
    path: 'directory',
    canActivate: [ResourceGuard(UcroniaPermissions.directory.profile.read)],
    loadComponent: () => import('./directory-view/directory-view').then(m => m.DirectoryView)
  }
];
