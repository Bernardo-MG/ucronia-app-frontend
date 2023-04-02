import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityUserFormComponent } from './components/security-user-form/security-user-form.component';
import { SecurityUserRoleFormComponent } from './components/security-user-role-form/security-user-role-form.component';
import { SecurityUserRoleSelectionComponent } from './components/security-user-role-selection/security-user-role-selection.component';
import { SecurityUserCreateViewComponent } from './containers/security-user-create-view/security-user-create-view.component';
import { SecurityUserEditViewComponent } from './containers/security-user-edit-view/security-user-edit-view.component';
import { SecurityUserListViewComponent } from './containers/security-user-list-view/security-user-list-view.component';
import { SecurityUserService } from './services/security-user.service';
import { UserRoutingModule } from './users-routing.module';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  declarations: [
    SecurityUserFormComponent,
    SecurityUserCreateViewComponent,
    SecurityUserEditViewComponent,
    SecurityUserListViewComponent,
    SecurityUserRoleFormComponent,
    SecurityUserRoleSelectionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IconsModule,
    SharedModule,
    PaginationModule,
    CoreModule
  ],
  providers: [
    SecurityUserService
  ]
})
export class UsersModule { }
