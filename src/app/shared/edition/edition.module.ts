import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DynamicEditFormComponent } from './components/dynamic-edit-form/dynamic-edit-form.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicEditFormComponent,
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
    DynamicFormBodyComponent,
    FormFrameComponent,
    LoginFormComponent
  ]
})
export class EditionModule { }
