import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetService } from './services/password-reset.service';



@NgModule({
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    LayoutModule
  ],
  providers: [
    PasswordResetService
  ]
})
export class PasswordResetModule { }
