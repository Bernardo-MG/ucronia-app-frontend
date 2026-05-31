import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const myFeesRoutes: Routes = [
  {
    path: 'myFees',
    canActivate: [ResourceGuard('my_fees', 'view')],
    loadComponent: () => import('./my-fees-view/my-fees-view').then(m => m.MyFeesView)
  }
];
