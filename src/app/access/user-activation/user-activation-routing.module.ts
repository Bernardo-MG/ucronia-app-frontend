import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@app/shared/layout/components/centered-frame/centered-frame.component';
import { UserActivationContainer } from './containers/user-activation/user-activation.container';

const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: ':token', component: UserActivationContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivationRoutingModule { }