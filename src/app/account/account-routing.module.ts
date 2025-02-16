import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutContainer } from './containers/account-layout/account-layout.container';
import { AccountPasswordChangeContainer } from './containers/account-password-change/account-password-change.container';
import { AccountProfileFrontpageContainer } from './containers/account-profile-frontpage/account-profile-frontpage.container';


const routes: Routes = [
  {
    path: '',
    component: AccountLayoutContainer,
    data: { breadcrumb: 'Cuenta' },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: AccountProfileFrontpageContainer,
        data: { breadcrumb: 'Perfil' }
      },
      {
        path: 'password',
        component: AccountPasswordChangeContainer,
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