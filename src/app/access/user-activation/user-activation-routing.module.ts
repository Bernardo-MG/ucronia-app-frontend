import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/shared/layout/components/centered-frame/centered-frame.component';
import { UserActivationComponent } from './components/user-activation/user-activation.component';

const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: ':token', component: UserActivationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivationRoutingModule { }