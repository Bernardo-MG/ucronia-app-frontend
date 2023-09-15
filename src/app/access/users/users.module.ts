import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserCreateFormComponent } from './components/access-user-create-form/access-user-create-form.component';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserDetailsComponent } from './components/access-user-details/access-user-details.component';
import { AccessUserEditFormComponent } from './components/access-user-edit-form/access-user-edit-form.component';
import { AccessUserInfoComponent } from './components/access-user-info/access-user-info.component';
import { AccessFrontpageComponent } from './components/access-user-frontpage/access-user-frontpage.component';
import { AccessUserRoleFormComponent } from './components/access-user-roles/access-user-roles.component';
import { AccessUserService } from './services/access-user.service';
import { UserRoutingModule } from './users-routing.module';
import { AccessUserSelectionListComponent } from './components/access-user-selection-list/access-user-selection-list.component';



@NgModule({
  declarations: [
    AccessUserEditFormComponent,
    AccessUserCreateFormComponent,
    AccessUserCreateComponent,
    AccessUserDetailsComponent,
    AccessFrontpageComponent,
    AccessUserRoleFormComponent,
    AccessUserInfoComponent,
    AccessUserSelectionListComponent
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
