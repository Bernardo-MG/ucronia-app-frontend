import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';
// Route arrays will be lazy-loaded via `loadChildren` to avoid eager import

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@app/core/layout/association-layout/association-layout')
        .then(m => m.AssociationLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./frontpage/frontpage/frontpage')
            .then(m => m.Frontpage)
      },
      {
        path: '',
        canActivateChild: [LoggedOutGuard],
        loadChildren: () => import('./access/access.routes').then(m => m.accessRoutes)
      },
      {
        path: '',
        canActivateChild: [LoggedInGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./account/account.routes').then(m => m.accountRoutes)
          },
          {
            path: 'association',
            loadChildren: () => import('./association/association.routes').then(m => m.associationRoutes)
          },
          {
            path: '',
            loadChildren: () => import('./security/security.routes').then(m => m.securityRoutes)
          },
          {
            path: '',
            loadChildren: () => import('./settings/settings.routes').then(m => m.settingsRoutes)
          }
        ]
      }
    ]
  }
];

