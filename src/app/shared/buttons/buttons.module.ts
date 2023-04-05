import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonLinkCreateComponent } from './components/button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './components/button-link-edit/button-link-edit.component';
import { ButtonSearchSecondaryComponent } from './components/button-search-secondary/button-search-secondary.component';



@NgModule({
  declarations: [
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule
  ],
  exports: [
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent
  ]
})
export class ButtonsModule { }
