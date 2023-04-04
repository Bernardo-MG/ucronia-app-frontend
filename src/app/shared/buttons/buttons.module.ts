import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '../icons/icons.module';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonLinkCreateComponent } from './components/button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './components/button-link-edit/button-link-edit.component';
import { ButtonSearchSecondaryComponent } from './components/button-search-secondary/button-search-secondary.component';
import { ButtonComponent } from './components/button/button.component';
import { OrderButtonTemplateComponent } from './components/order-button-template/order-button-template.component';
import { OrderButtonComponent } from './containers/order-button/order-button.component';



@NgModule({
  declarations: [
    ButtonComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    OrderButtonTemplateComponent,
    OrderButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    IconsModule
  ],
  exports: [
    ButtonComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    OrderButtonComponent
  ]
})
export class ButtonsModule { }
