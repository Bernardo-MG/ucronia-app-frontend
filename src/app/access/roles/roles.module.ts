import { NgModule } from '@angular/core';
import { AccessRoleService } from './services/access-role.service';
import { RoleRoutingModule } from './roles-routing.module';



@NgModule({
  imports: [
    RoleRoutingModule
  ],
  providers: [
    AccessRoleService
  ]
})
export class RolesModule { }
