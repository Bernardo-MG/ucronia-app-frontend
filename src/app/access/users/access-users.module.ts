import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserRoutingModule } from './access-users-routing.module';
import { AccessUserFormComponent } from './components/access-user-form/access-user-form.component';
import { AccessUserRoleFormComponent } from './components/access-user-role-form/access-user-role-form.component';
import { AccessUserRoleSelectionComponent } from './components/access-user-role-selection/access-user-role-selection.component';
import { AccessUserCreateComponent } from './containers/access-user-create/access-user-create.component';
import { AccessUserEditComponent } from './containers/access-user-details/access-user-details.component';
import { AccessUserListComponent } from './containers/access-user-list/access-user-list.component';
import { AccessUserService } from './services/access-user.service';



@NgModule({
  declarations: [
    AccessUserFormComponent,
    AccessUserCreateComponent,
    AccessUserEditComponent,
    AccessUserListComponent,
    AccessUserRoleFormComponent,
    AccessUserRoleSelectionComponent
  ],
  imports: [
    CommonModule,
    AccessUserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IconsModule,
    PaginationModule,
    CoreModule,
    LayoutModule,
    EditionModule
  ],
  providers: [
    AccessUserService
  ]
})
export class AccessUsersModule { }
