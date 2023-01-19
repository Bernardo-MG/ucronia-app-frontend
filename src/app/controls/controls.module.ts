import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonLinkCreateComponent } from './button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './button-link-edit/button-link-edit.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { ButtonBackwardComponent } from './button-backward/button-backward.component';
import { ButtonForwardComponent } from './button-forward/button-forward.component';
import { ButtonSearchSecondaryComponent } from './button-search-secondary/button-search-secondary.component';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { CueLoadingComponent } from './cue-waiting/cue-loading.component';



@NgModule({
  declarations: [
    FormControlsComponent,
    ButtonLinkEditComponent,
    ButtonLinkCreateComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    FormControlsComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent
  ]
})
export class ControlsModule { }
