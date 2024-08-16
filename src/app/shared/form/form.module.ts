import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { InputFailureFeedbackComponent } from './components/input-failure-feedback/input-failure-feedback.component';



@NgModule({
  declarations: [
    EditorHeaderComponent,
    InputFailureFeedbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule
  ],
  exports: [
    EditorHeaderComponent,
    InputFailureFeedbackComponent
  ]
})
export class FormModule { }
