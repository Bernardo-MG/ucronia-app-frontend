import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonLinkCreateComponent } from './components/button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './components/button-link-edit/button-link-edit.component';
import { ButtonSearchSecondaryComponent } from './components/button-search-secondary/button-search-secondary.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    ButtonComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent
  ]
})
export class ButtonsModule { }
