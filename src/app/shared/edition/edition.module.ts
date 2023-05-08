import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { DynamicEditFormComponent } from './components/dynamic-edit-form/dynamic-edit-form.component';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicInfoFormComponent } from './components/dynamic-info-form/dynamic-info-form.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicEditFormComponent,
    DynamicInfoFormComponent,
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
    DynamicEditFormComponent,
    DynamicInfoFormComponent,
    DynamicFormBodyComponent,
    FormFrameComponent,
    LoginFormComponent
  ]
})
export class EditionModule { }
