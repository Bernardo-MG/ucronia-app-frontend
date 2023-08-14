import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserRoutingModule } from './access-users-routing.module';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserCreationFormComponent } from './components/access-user-creation-form/access-user-creation-form.component';
import { AccessUserDetailsComponent } from './components/access-user-details/access-user-details.component';
import { AccessUserFormComponent } from './components/access-user-form/access-user-form.component';
import { AccessUserInfoComponent } from './components/access-user-info/access-user-info.component';
import { AccessUserListComponent } from './components/access-user-list/access-user-list.component';
import { AccessUserRoleSelectionComponent } from './components/access-user-role-selection/access-user-role-selection.component';
import { AccessUserRoleFormComponent } from './components/access-user-roles/access-user-roles.component';
import { AccessUserService } from './services/access-user.service';
import { AccessUserActivateUserComponent } from './components/access-user-activate-user/access-user-activate-user.component';
import { AccessUserActivateUserFormComponent } from './components/access-user-activate-user-form/access-user-activate-user-form.component';



@NgModule({
  declarations: [
    AccessUserFormComponent,
    AccessUserCreationFormComponent,
    AccessUserCreateComponent,
    AccessUserDetailsComponent,
    AccessUserListComponent,
    AccessUserRoleFormComponent,
    AccessUserRoleSelectionComponent,
    AccessUserInfoComponent,
    AccessUserActivateUserComponent,
    AccessUserActivateUserFormComponent
  ],
  imports: [
    CommonModule,
    AccessUserRoutingModule,
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
export class AccessUsersModule { }
