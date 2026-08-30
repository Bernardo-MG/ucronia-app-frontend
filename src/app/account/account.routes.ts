import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: 'account',
    loadComponent: () =>
      import('./account-view/account-view')
        .then(module => module.AccountView)
  }
];