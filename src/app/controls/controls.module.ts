import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { NavigationReturnButtonComponent } from './navigation-return-button/navigation-return-button.component';



@NgModule({
  declarations: [
    NavigationReturnButtonComponent,
    FormControlsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationReturnButtonComponent,
    FormControlsComponent
  ]
})
export class ControlsModule { }
