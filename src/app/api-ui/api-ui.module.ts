import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonComponent } from './order-button/order-button.component';
import { OrderControllerButtonComponent } from './order-controller-button/order-controller-button.component';
import { PaginationActuatorNavigationComponent } from './pagination-actuator-navigation/pagination-actuator-navigation.component';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginationActuatorNavigationComponent,
    OrderButtonComponent,
    OrderControllerButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationActuatorNavigationComponent,
    OrderControllerButtonComponent
  ]
})
export class ApiUiModule { }
