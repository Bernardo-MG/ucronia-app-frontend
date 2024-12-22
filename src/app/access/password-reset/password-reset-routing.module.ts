import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/shared/layout/components/centered-frame/centered-frame.component';
import { PasswordResetRequestContainer } from './containers/password-reset-request/password-reset-request.container';
import { PasswordResetContainer } from './containers/password-reset/password-reset.container';


const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: '', component: PasswordResetRequestContainer },
      { path: ':token', component: PasswordResetContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }