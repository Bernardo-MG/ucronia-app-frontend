import { Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

export const scheduledGameRoutes: Routes = [
  {
    path: 'scheduled-games',
    canActivate: [ResourceGuard('scheduled_game', 'view')],
    loadComponent: () => import('./scheduled-game-view/scheduled-game-view').then(m => m.ScheduledGameView)
  }
];
