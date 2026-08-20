import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';

export const scheduledGameRoutes: Routes = [
  {
    path: 'scheduled-games',
    canActivate: [ResourceGuard(UcroniaPermissions.scheduledGame.read)],
    loadComponent: () => import('./scheduled-game-view/scheduled-game-view').then(m => m.ScheduledGameView)
  }
];
