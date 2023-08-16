import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddedFrameComponent } from '@app/core/layout/components/padded-frame/padded-frame.component';
import { UserActivateUserComponent } from './components/activate-user/user-activate-user.component';

const routes: Routes = [
  {
    path: '',
    component: PaddedFrameComponent,
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