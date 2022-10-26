import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecurityRoleFormComponent } from './roles/components/security-role-form/security-role-form.component';
import { SecurityRoleService } from './roles/service/security-role.service';
import { SecurityRoleCreateViewComponent } from './roles/views/security-role-create-view/security-role-create-view.component';
import { SecurityRoleEditViewComponent } from './roles/views/security-role-edit-view/security-role-edit-view.component';
import { SecurityRoleListViewComponent } from './roles/views/security-role-list-view/security-role-list-view.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityUserFormComponent } from './users/components/security-user-form/security-user-form.component';
import { SecurityUserService } from './users/service/security-user.service';
import { SecurityUserCreateViewComponent } from './users/views/security-user-create-view/security-user-create-view.component';
import { SecurityUserEditViewComponent } from './users/views/security-user-edit-view/security-user-edit-view.component';
import { SecurityUserListViewComponent } from './users/views/security-user-list-view/security-user-list-view.component';



@NgModule({
  declarations: [
    SecurityUserFormComponent,
    SecurityUserCreateViewComponent,
    SecurityUserEditViewComponent,
    SecurityUserListViewComponent,
    SecurityRoleFormComponent,
    SecurityRoleCreateViewComponent,
    SecurityRoleEditViewComponent,
    SecurityRoleListViewComponent
  ],
  imports: [
    SecurityRoutingModule,
    CommonModule
  ],
  providers: [
    SecurityRoleService,
    SecurityUserService
  ]
})
export class SecurityModule { }
