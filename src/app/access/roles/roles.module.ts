import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from './components/security-role-form/security-role-form.component';
import { SecurityRolePrivilegeFormComponent } from './components/security-role-privilege-form/security-role-privilege-form.component';
import { SecurityRolePrivilegeSelectionComponent } from './components/security-role-privilege-selection/security-role-privilege-selection.component';
import { SecurityRoleCreateViewComponent } from './containers/security-role-create-view/security-role-create-view.component';
import { SecurityRoleEditViewComponent } from './containers/security-role-edit-view/security-role-edit-view.component';
import { SecurityRoleListViewComponent } from './containers/security-role-list-view/security-role-list-view.component';
import { RoleRoutingModule } from './roles-routing.module';
import { SecurityRoleService } from './services/security-role.service';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    SecurityRoleFormComponent,
    SecurityRoleCreateViewComponent,
    SecurityRoleEditViewComponent,
    SecurityRoleListViewComponent,
    SecurityRolePrivilegeFormComponent,
    SecurityRolePrivilegeSelectionComponent,
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
    PaginationModule,
    IconsModule,
    LayoutModule
  ],
  providers: [
    SecurityRoleService
  ]
})
export class RolesModule { }
