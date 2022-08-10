import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormCreateControlsComponent } from './form-create-controls/form-create-controls.component';
import { FormUpdateControlsComponent } from './form-update-controls/form-update-controls.component';
import { NavigationReturnButtonComponent } from './navigation-return-button/navigation-return-button.component';



@NgModule({
  declarations: [
    NavigationReturnButtonComponent,
    FormCreateControlsComponent,
    FormUpdateControlsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationReturnButtonComponent,
    FormCreateControlsComponent,
    FormUpdateControlsComponent
  ]
})
export class ControlsModule { }
