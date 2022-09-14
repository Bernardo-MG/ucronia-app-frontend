import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { ButtonLinkCreateComponent } from './button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './button-link-edit/button-link-edit.component';
import { FormControlsComponent } from './form-controls/form-controls.component';



@NgModule({
  declarations: [
    FormControlsComponent,
    ButtonLinkEditComponent,
    ButtonLinkCreateComponent,
    ButtonDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    FormControlsComponent,
    ButtonDeleteComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent
  ]
})
export class ControlsModule { }
