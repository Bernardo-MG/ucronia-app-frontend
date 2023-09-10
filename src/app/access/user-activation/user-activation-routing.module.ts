import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserActivateUserComponent } from './components/activate-user/user-activate-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':token', component: UserActivateUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivationRoutingModule { }