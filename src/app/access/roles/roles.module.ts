import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoleRoutingModule } from './roles-routing.module';
import { AccessRoleService } from './services/access-role.service';



@NgModule({
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
