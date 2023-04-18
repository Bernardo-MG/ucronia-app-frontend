import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleFormComponent } from './components/access-role-form/access-role-form.component';
import { AccessRolePrivilegeFormComponent } from './components/access-role-privilege-form/access-role-privilege-form.component';
import { AccessRolePrivilegeSelectionComponent } from './components/access-role-privilege-selection/access-role-privilege-selection.component';
import { AccessRoleCreateViewComponent } from './containers/access-role-create-view/access-role-create-view.component';
import { AccessRoleEditViewComponent } from './containers/access-role-edit-view/access-role-edit-view.component';
import { AccessRoleListViewComponent } from './containers/access-role-list-view/access-role-list-view.component';
import { AccessRoleRoutingModule } from './access-roles-routing.module';
import { AccessRoleService } from './services/access-role.service';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    AccessRoleFormComponent,
    AccessRoleCreateViewComponent,
    AccessRoleEditViewComponent,
    AccessRoleListViewComponent,
    AccessRolePrivilegeFormComponent,
    AccessRolePrivilegeSelectionComponent,
  ],
  imports: [
    CommonModule,
    AccessRoleRoutingModule,
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
export class AccessRolesModule { }
