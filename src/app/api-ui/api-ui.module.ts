import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderButtonTemplateComponent } from './order-button-template/order-button-template.component';
import { RouteOrderButtonComponent } from './route-order-button/route-order-button.component';
import { RoutePaginationNavigationComponent } from './route-pagination-navigation/route-pagination-navigation.component';
import { PaginationNavigationTemplateComponent } from './pagination-navigation-template/pagination-navigation-template.component';
import { PaginationSizeSelectorTemplateComponent } from './pagination-size-selector-template/pagination-size-selector-template.component';
import { RoutePaginationSizeSelectorComponent } from './route-pagination-size-selector/route-pagination-size-selector.component';



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
