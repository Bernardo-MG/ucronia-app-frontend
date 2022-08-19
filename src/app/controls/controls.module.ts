import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControlsComponent } from './form-controls/form-controls.component';



@NgModule({
  declarations: [
    FormControlsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FormControlsComponent
  ]
})
export class ControlsModule { }
