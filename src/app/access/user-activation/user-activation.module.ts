import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { UserActivationComponent } from './components/user-activation/user-activation.component';
import { UserActivationFormComponent } from './components/user-activation-form/user-activation-form.component';
import { AccessUserActivateService } from './services/user-activate.service';
import { UserActivationRoutingModule } from './user-activation-routing.module';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    UserActivationComponent,
    UserActivationFormComponent
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
