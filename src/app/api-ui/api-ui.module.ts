import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonTemplateComponent } from './components/order-button-template/order-button-template.component';
import { OrderButtonComponent } from './containers/order-button/order-button.component';
import { PaginationNavigationTemplateComponent } from './components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './containers/pagination-navigation/pagination-navigation.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';
import { PaginationSizeSelectorComponent } from './containers/pagination-size-selector/pagination-size-selector.component';



@NgModule({
  declarations: [
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    PaginationNavigationComponent,
    OrderButtonComponent,
    PaginationSizeSelectorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    PaginationNavigationComponent,
    OrderButtonComponent,
    PaginationSizeSelectorComponent
  ]
})
export class ApiUiModule { }
