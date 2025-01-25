import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAuditLoginContainer } from './containers/access-audit-login/access-audit-login.container';


const routes: Routes = [
  {
    path: '',
    component: AccessAuditLoginContainer,
    data: { breadcrumb: 'Auditoría' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }