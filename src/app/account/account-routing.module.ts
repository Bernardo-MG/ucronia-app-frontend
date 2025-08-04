import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/account-layout/account-layout.container').then(m => m.AccountLayoutContainer),
    data: { breadcrumb: 'Cuenta' },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadComponent: () => import('./containers/account-profile-frontpage/account-profile-frontpage.container').then(m => m.AccountProfileFrontpageContainer),
        data: { breadcrumb: 'Perfil' }
      },
      {
        path: 'password',
        loadComponent: () => import('./containers/account-password-change/account-password-change.container').then(m => m.AccountPasswordChangeContainer),
        data: { breadcrumb: 'Contraseña' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }