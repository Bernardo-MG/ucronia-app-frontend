import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const imageRoutes: Routes = [
  {
    path: 'images',
    canActivate: [ResourceGuard(UcroniaPermissions.image.read)],
    loadComponent: () => import('./image-view/image-view').then(m => m.ImageView)
  }
];
