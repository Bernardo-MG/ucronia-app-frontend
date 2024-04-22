import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAuditLoginComponent } from './components/views/access-audit-login/access-audit-login.component';


const routes: Routes = [
  { path: '', component: AccessAuditLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }