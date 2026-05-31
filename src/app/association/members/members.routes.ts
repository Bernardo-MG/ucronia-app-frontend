import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const membersRoutes: Routes = [
  {
    path: 'members',
    canActivate: [ResourceGuard('member', 'view')],
    loadComponent: () => import('./member-view/member-view').then(m => m.MemberView)
  }
];
