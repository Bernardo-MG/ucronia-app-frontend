import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserRoutingModule } from './access-users-routing.module';
import { AccessUserFormComponent } from './components/access-user-form/access-user-form.component';
import { AccessUserRoleFormComponent } from './components/access-user-role-form/access-user-role-form.component';
import { AccessUserRoleSelectionComponent } from './components/access-user-role-selection/access-user-role-selection.component';
import { AccessUserCreateViewComponent } from './containers/access-user-create-view/access-user-create-view.component';
import { AccessUserEditViewComponent } from './containers/access-user-edit-view/access-user-edit-view.component';
import { AccessUserListViewComponent } from './containers/access-user-list-view/access-user-list-view.component';
import { AccessUserService } from './services/access-user.service';



@NgModule({
  declarations: [
    AccessUserFormComponent,
    AccessUserCreateViewComponent,
    AccessUserEditViewComponent,
    AccessUserListViewComponent,
    AccessUserRoleFormComponent,
    AccessUserRoleSelectionComponent
  ],
  imports: [
    CommonModule,
    AccessUserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IconsModule,
    SharedModule,
    PaginationModule,
    CoreModule,
    LayoutModule
  ],
  providers: [
    AccessUserService
  ]
})
export class AccessUsersModule { }
