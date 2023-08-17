import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/core/layout/components/centered-frame/centered-frame.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: '', component: PasswordResetRequestComponent },
      { path: ':token', component: PasswordResetComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }