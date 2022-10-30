import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from './components/security-role-form/security-role-form.component';
import { SecurityRoleService } from './service/security-role.service';
import { SecurityRoleCreateViewComponent } from './views/security-role-create-view/security-role-create-view.component';
import { SecurityRoleEditViewComponent } from './views/security-role-edit-view/security-role-edit-view.component';
import { SecurityRoleListViewComponent } from './views/security-role-list-view/security-role-list-view.component';



@NgModule({
  declarations: [
    SecurityRoleFormComponent,
    SecurityRoleCreateViewComponent,
    SecurityRoleEditViewComponent,
    SecurityRoleListViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule,
    ApiUiModule
  ],
  providers: [
    SecurityRoleService
  ]
})
export class RolesModule { }
