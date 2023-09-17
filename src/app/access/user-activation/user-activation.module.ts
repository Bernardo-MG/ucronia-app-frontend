import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { UserActivateUserComponent } from './components/activate-user/user-activate-user.component';
import { UserActivateUserFormComponent } from './components/user-activate-user-form/user-activate-user-form.component';
import { AccessUserActivateService } from './services/user-activate.service';
import { UserActivationRoutingModule } from './user-activation-routing.module';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    UserActivateUserComponent,
    UserActivateUserFormComponent
  ],
  imports: [
    CommonModule,
    UserActivationRoutingModule,
    IconsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  providers: [
    AccessUserActivateService
  ]
})
export class UserActivationModule { }
