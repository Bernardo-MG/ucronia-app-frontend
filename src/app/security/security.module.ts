import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RolesModule } from './data/roles/roles.module';
import { UsersModule } from './data/users/users.module';
import { PasswordModule } from './password/password.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule,
    ApiUiModule,
    RolesModule,
    UsersModule,
    RegisterModule,
    PasswordModule
  ]
})
export class SecurityModule { }
