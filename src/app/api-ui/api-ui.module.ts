import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonTemplateComponent } from './order-button-template/order-button-template.component';
import { RouteOrderButtonComponent } from './order-route-button/order-route-button.component';
import { RoutePaginationNavigationComponent } from './pagination-route-navigation/pagination-route-navigation.component';
import { PaginationNavigationTemplateComponent } from './pagination-navigation-template/pagination-navigation-template.component';
import { PaginationSizeSelectorTemplateComponent } from './pagination-size-selector-template/pagination-size-selector-template.component';
import { RoutePaginationSizeSelectorComponent } from './pagination-route-size-selector/pagination-route-size-selector.component';



@NgModule({
  declarations: [
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    RoutePaginationNavigationComponent,
    RouteOrderButtonComponent,
    RoutePaginationSizeSelectorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationNavigationTemplateComponent,
    PaginationSizeSelectorTemplateComponent,
    OrderButtonTemplateComponent,
    RoutePaginationNavigationComponent,
    RouteOrderButtonComponent,
    RoutePaginationSizeSelectorComponent
  ]
})
export class ApiUiModule { }
