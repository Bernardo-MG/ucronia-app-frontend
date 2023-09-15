import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountChangePasswordViewComponent } from './components/account-password-view/account-password-view.component';
import { AccountProfileViewComponent } from './components/account-profile-view/account-profile-view.component';


const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: 'settings',
        children: [
          { path: '', component: AccountProfileViewComponent },
          { path: 'profile', component: AccountProfileViewComponent },
          { path: 'password', component: AccountChangePasswordViewComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }