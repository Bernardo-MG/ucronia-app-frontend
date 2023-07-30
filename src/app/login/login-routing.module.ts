import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/core/layout/components/centered-frame/centered-frame.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { PasswordResetRequestComponent } from './components/password-reset-request/password-reset-request.component';


const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'password_reset',
        children: [
          { path: '', component: PasswordResetRequestComponent },
          { path: ':token', component: PasswordResetFormComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }