import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteIconComponent } from '../icons/components/icon-delete/icon-delete.component';
import { EditIconComponent } from '../icons/components/icon-edit/icon-edit.component';
import { ModalComponent } from '../layout/components/modal/modal.component';
import { JustifyBetweenDirective } from '../style/directives/justify-between.directive';
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
    ModalComponent,
    JustifyBetweenDirective,
    DeleteIconComponent,
    EditIconComponent
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
