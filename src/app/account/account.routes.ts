import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: 'account',
    loadComponent: () => import('./account-layout/account-layout').then(m => m.AccountLayout),
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        loadComponent: () => import('./account-profile-view/account-profile-view').then(m => m.AccountProfileView)
      },
      {
        path: 'password',
        loadComponent: () => import('./account-password-change-view/account-password-change-view').then(m => m.AccountPasswordChangeView)
      }
    ]
  }
];
