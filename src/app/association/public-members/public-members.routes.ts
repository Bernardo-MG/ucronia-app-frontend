import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const PublicMembersRoutes: Routes = [
  {
    path: 'members',
    canActivate: [ResourceGuard(UcroniaPermissions.directory.member.read)],
    loadComponent: () => import('./public-member-view/public-member-view').then(m => m.PublicMemberView)
  }
];
