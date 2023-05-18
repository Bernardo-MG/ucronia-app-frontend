import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleRoutingModule } from './access-roles-routing.module';
import { AccessRoleFormComponent } from './components/access-role-form/access-role-form.component';
import { AccessRolePermissionFormComponent } from './components/access-role-permission-form/access-role-permission-form.component';
import { AccessRoleCreateComponent } from './containers/access-role-create/access-role-create.component';
import { AccessRoleDetailsComponent } from './containers/access-role-details/access-role-details.component';
import { AccessRoleListComponent } from './containers/access-role-list/access-role-list.component';
import { AccessRoleService } from './services/access-role.service';



@NgModule({
  declarations: [
    AccessRoleFormComponent,
    AccessRoleCreateComponent,
    AccessRoleDetailsComponent,
    AccessRoleListComponent,
    AccessRolePermissionFormComponent,
  ],
  imports: [
    CommonModule,
    AccessRoleRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
    PaginationModule,
    IconsModule,
    LayoutModule,
    EditionModule
  ],
  providers: [
    AccessRoleService
  ]
})
export class AccessRolesModule { }
