import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { DynamicEditFormComponent } from './components/dynamic-edit-form/dynamic-edit-form.component';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { EditFormWrapperComponent } from './components/edit-form-wrapper/edit-form-wrapper.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { FormBaseComponent } from './components/form-base/form-base.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicEditFormComponent,
    InfoFormComponent,
    DynamicFormBodyComponent,
    FormFrameComponent,
    EditFormWrapperComponent,
    FormBaseComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    DynamicEditFormComponent,
    InfoFormComponent,
    FormFrameComponent,
    EditFormWrapperComponent,
    DynamicFormBodyComponent,
    FormBaseComponent
  ]
})
export class EditionModule { }
