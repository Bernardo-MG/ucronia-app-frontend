import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    FormComponent,
    EditorHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule
  ],
  exports: [
    FormComponent,
    EditorHeaderComponent
  ]
})
export class FormModule { }
