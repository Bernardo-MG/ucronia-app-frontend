import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: 'account',
    loadComponent: () =>
      import('./account-layout/account-layout')
        .then(module => module.AccountLayout)
  }
];