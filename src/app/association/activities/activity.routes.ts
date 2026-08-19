import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const activityRoutes: Routes = [
  {
    path: 'activities',
    canActivate: [ResourceGuard(UcroniaPermissions.activity.read)],
    loadComponent: () => import('./activity-view/activity-view').then(m => m.ActivityView)
  }
];
