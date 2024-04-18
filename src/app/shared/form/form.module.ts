import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { FormComponent } from './components/form/form.component';
import { InfoEditorComponent } from './components/info-editor/info-editor.component';
import { InfoEditorFormDirective } from './directives/info-editor-form.directive';
import { InfoEditorInfoDirective } from './directives/info-editor-info.directive';



@NgModule({
  declarations: [
    FormComponent,
    EditorHeaderComponent,
    InfoEditorComponent,
    InfoEditorFormDirective,
    InfoEditorInfoDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule
  ],
  exports: [
    FormComponent,
    EditorHeaderComponent,
    InfoEditorComponent,
    InfoEditorFormDirective,
    InfoEditorInfoDirective
  ]
})
export class FormModule { }
