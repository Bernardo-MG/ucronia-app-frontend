import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/core/layout/components/centered-frame/centered-frame.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }