import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/layout/account-layout/account-layout.component';
import { AccountPasswordChangeContainer } from './containers/account-password-change/account-password-change.container';
import { AccountProfileFrontpageContainer } from './containers/account-profile-frontpage/account-profile-frontpage.container';


const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      { path: '', component: AccountProfileFrontpageContainer },
      { path: 'profile', component: AccountProfileFrontpageContainer },
      { path: 'password', component: AccountPasswordChangeContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }