import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonComponent } from './order-button/order-button.component';
import { OrderControllerButtonComponent } from './order-controller-button/order-controller-button.component';
import { PaginationActuatorNavigationComponent } from './pagination-actuator-navigation/pagination-actuator-navigation.component';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';
import { PaginationSizeSelectorComponent } from './pagination-size-selector/pagination-size-selector.component';
import { PaginationSizeActuatorSelectorComponent } from './pagination-size-actuator-selector/pagination-size-actuator-selector.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginationActuatorNavigationComponent,
    OrderButtonComponent,
    OrderControllerButtonComponent,
    PaginationSizeSelectorComponent,
    PaginationSizeActuatorSelectorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationActuatorNavigationComponent,
    OrderControllerButtonComponent,
    PaginationSizeActuatorSelectorComponent
  ]
})
export class ApiUiModule { }
