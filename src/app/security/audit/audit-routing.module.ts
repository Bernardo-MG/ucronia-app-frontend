import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/access-audit-login/access-audit-login.container').then(m => m.AccessAuditLoginContainer),
    data: { breadcrumb: 'Auditoría' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }