import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AccountPasswordChangeComponent } from './components/account-password-change/account-password-change.component';
import { AccountProfileViewComponent } from './components/account-profile/account-profile.component';


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
          { path: 'password', component: AccountPasswordChangeComponent }
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