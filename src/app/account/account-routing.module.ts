import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/layout/account-layout/account-layout.component';
import { AccountPasswordChangeComponent } from './components/views/account-password-change/account-password-change.component';
import { AccountProfileFrontpageComponent } from './components/views/account-profile-frontpage/account-profile-frontpage.component';


const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      { path: '', component: AccountProfileFrontpageComponent },
      { path: 'profile', component: AccountProfileFrontpageComponent },
      { path: 'password', component: AccountPasswordChangeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }