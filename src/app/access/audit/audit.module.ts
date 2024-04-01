import { NgModule } from '@angular/core';
import { AuditRoutingModule } from './audit-routing.module';
import { AccessAuditLoginService } from './services/access-audit-login.service';



@NgModule({
  imports: [
    AuditRoutingModule
  ],
  providers: [
    AccessAuditLoginService
  ]
})
export class AuditModule { }
