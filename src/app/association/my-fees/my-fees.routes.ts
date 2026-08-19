import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const myFeesRoutes: Routes = [
  {
    path: 'myFees',
    canActivate: [ResourceGuard(UcroniaPermissions.myFees.read)],
    loadComponent: () => import('./my-fees-view/my-fees-view').then(m => m.MyFeesView)
  }
];
