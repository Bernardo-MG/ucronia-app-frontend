import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';



@NgModule({
  declarations: [
    EditorHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule
  ],
  exports: [
    EditorHeaderComponent
  ]
})
export class FormModule { }
