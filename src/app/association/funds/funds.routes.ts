import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const fundsRoutes: Routes = [
  {
    path: 'funds',
    canActivate: [ResourceGuard('FUNDS', 'VIEW')],
    loadComponent: () => import('./funds-view/funds-view').then(m => m.FundsView)
  }
];
