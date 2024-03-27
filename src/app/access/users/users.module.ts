import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserAddRoleComponent } from './components/access-user-add-role/access-user-add-role.component';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserFormComponent } from './components/access-user-form/access-user-form.component';
import { AccessUserInfoEditorComponent } from './components/access-user-info-editor/access-user-info-editor.component';
import { AccessUserInfoComponent } from './components/access-user-info/access-user-info.component';
import { AccessUserRoleFormComponent } from './components/access-user-roles/access-user-roles.component';
import { AccessUserService } from './services/access-user.service';
import { UserRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    AccessUserFormComponent,
    AccessUserCreateComponent,
    AccessUserInfoEditorComponent,
    AccessUserRoleFormComponent,
    AccessUserInfoComponent,
    AccessUserAddRoleComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IconsModule,
    PaginationModule,
    CoreModule,
    LayoutModule
  ],
  providers: [
    AccessUserService
  ]
})
export class UsersModule { }
