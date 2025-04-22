import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@bernardo-mg/ui';
import { LoginContainer } from './containers/login/login.container';


const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: '', component: LoginContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }