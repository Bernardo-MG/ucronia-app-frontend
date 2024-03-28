import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserActivateService } from './services/user-activate.service';
import { UserActivationRoutingModule } from './user-activation-routing.module';



@NgModule({
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
