import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const feesRoutes: Routes = [
  {
    path: 'fees',
    canActivate: [ResourceGuard('fee', 'view')],
    loadComponent: () => import('./fee-view/fee-view').then(m => m.FeeView)
  }
];
