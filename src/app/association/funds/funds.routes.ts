import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const fundsRoutes: Routes = [
  {
    path: 'funds',
    canActivate: [ResourceGuard(UcroniaPermissions.transaction.read)],
    loadComponent: () => import('./funds-view/funds-view').then(m => m.FundsView)
  }
];
