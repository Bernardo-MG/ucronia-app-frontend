import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleAddPermissionComponent } from './components/access-role-add-permission/access-role-add-permission.component';
import { AccessRoleCreateComponent } from './components/access-role-create/access-role-create.component';
import { AccessRoleDetailsComponent } from './components/access-role-details/access-role-details.component';
import { AccessRoleFormComponent } from './components/access-role-form/access-role-form.component';
import { AccessRoleInfoComponent } from './components/access-role-info/access-role-info.component';
import { AccessRoleListComponent } from './components/access-role-list/access-role-list.component';
import { AccessRolePermissionsComponent } from './components/access-role-permissions/access-role-permissions.component';
import { RoleRoutingModule } from './roles-routing.module';
import { AccessRoleService } from './services/access-role.service';
import { AccessRoleSelectionListComponent } from './components/access-role-selection-list/access-role-selection-list.component';
import { AccessRoleActionPickListComponent } from './components/access-role-action-pick-list/access-role-action-pick-list.component';
import { AccessRoleResourcePickListComponent } from './components/access-role-resource-pick-list/access-role-resource-pick-list.component';



@NgModule({
  declarations: [
    AccessRoleFormComponent,
    AccessRoleCreateComponent,
    AccessRoleDetailsComponent,
    AccessRoleListComponent,
    AccessRolePermissionsComponent,
    AccessRoleInfoComponent,
    AccessRoleAddPermissionComponent,
    AccessRoleSelectionListComponent,
    AccessRoleActionPickListComponent,
    AccessRoleResourcePickListComponent,
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
    AccessRoleService
  ]
})
export class RolesModule { }
