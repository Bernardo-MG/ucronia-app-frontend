import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const fileRoutes: Routes = [
  {
    path: 'files',
    canActivate: [ResourceGuard(UcroniaPermissions.file.read)],
    loadComponent: () => import('./file-view/file-view').then(m => m.FileView)
  }
];
