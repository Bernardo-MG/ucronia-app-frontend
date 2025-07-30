import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenteredFrameComponent } from '@bernardo-mg/ui';




const routes: Routes = [
  {
    path: '',
    component: CenteredFrameComponent,
    children: [
      { path: '', loadComponent: () => import('./containers/password-reset-request/password-reset-request.container').then(m => m.PasswordResetRequestContainer) },
      { path: ':token', loadComponent: () => import('./containers/password-reset/password-reset.container').then(m => m.PasswordResetContainer) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }