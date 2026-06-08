import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const activityRoutes: Routes = [
  {
    path: 'activities',
    canActivate: [ResourceGuard('activity', 'view')],
    loadComponent: () => import('./activity-view/activity-view').then(m => m.ActivityView)
  }
];
