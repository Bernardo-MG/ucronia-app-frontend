import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const feesRoutes: Routes = [
  {
    path: 'fees',
    canActivate: [ResourceGuard(UcroniaPermissions.fee.read)],
    loadComponent: () => import('./fee-view/fee-view').then(m => m.FeeView)
  }
];
