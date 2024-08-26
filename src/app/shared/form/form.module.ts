import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { ModalComponent } from '../layout/components/modal/modal.component';
import { ControlButtonsComponent } from './components/control-buttons/control-buttons.component';
import { InputFailureFeedbackComponent } from './components/input-failure-feedback/input-failure-feedback.component';
import { InvalidFieldDirective } from './directives/invalid-field.directive';



@NgModule({
  declarations: [
    ControlButtonsComponent,
    InputFailureFeedbackComponent,
    InvalidFieldDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    ModalComponent
  ],
  exports: [
    ControlButtonsComponent,
    InputFailureFeedbackComponent,
    InvalidFieldDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
