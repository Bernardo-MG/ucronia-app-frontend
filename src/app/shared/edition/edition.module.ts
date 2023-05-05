import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { IconsModule } from '../icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormBodyComponent,
    FormFrameComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    DynamicFormBodyComponent,
    FormFrameComponent,
    LoginFormComponent
  ]
})
export class EditionModule { }
