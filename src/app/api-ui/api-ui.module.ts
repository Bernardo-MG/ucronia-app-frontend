import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonComponent } from './order-button/order-button.component';
import { OrderControllerButtonComponent } from './order-controller-button/order-controller-button.component';
import { PaginationPaginatorNavigationComponent } from './pagination-controller-navigation/pagination-controller-navigation.component';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';



@NgModule({
  declarations: [
    PaginationNavigationComponent,
    PaginationPaginatorNavigationComponent,
    OrderButtonComponent,
    OrderControllerButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationPaginatorNavigationComponent,
    OrderControllerButtonComponent
  ]
})
export class ApiUiModule { }
