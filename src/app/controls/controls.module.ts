import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { ButtonLinkCreateComponent } from './button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './button-link-edit/button-link-edit.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { ButtonBackwardComponent } from './button-backward/button-backward.component';
import { ButtonForwardComponent } from './button-forward/button-forward.component';
import { ButtonSearchComponent } from './button-search/button-search.component';



@NgModule({
  declarations: [
    FormControlsComponent,
    ButtonLinkEditComponent,
    ButtonLinkCreateComponent,
    ButtonDeleteComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchComponent
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
    ButtonLinkEditComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchComponent
  ]
})
export class ControlsModule { }
