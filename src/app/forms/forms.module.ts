import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormCreateControlsComponent } from './create-controls/form-create-controls.component';
import { FormUpdateControlsComponent } from './form-update-controls/form-update-controls.component';



@NgModule({
  declarations: [
    FormCreateControlsComponent,
    FormUpdateControlsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FormCreateControlsComponent,
    FormUpdateControlsComponent
  ]
})
export class CustomFormsModule { }
