import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/shared/layout/components/centered-frame/centered-frame.component';
import { UserActivateUserComponent } from './components/activate-user/user-activate-user.component';

const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
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