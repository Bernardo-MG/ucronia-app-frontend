import { Routes } from '@angular/router';

export const accessRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@bernardo-mg/login').then(m => m.LoginView)
  },
  {
    path: 'password/reset',
    children: [
      {
        path: '',
        loadComponent: () => import('@bernardo-mg/login').then(m => m.PasswordResetRequestView)
      },
      {
        path: ':token',
        loadComponent: () => import('@bernardo-mg/login').then(m => m.PasswordResetView)
      }
    ]
  },
  {
    path: 'users/activate/:token',
    loadComponent: () => import('./user-activation/user-activation-view/user-activation-view').then(m => m.UserActivationView)
  }
];
