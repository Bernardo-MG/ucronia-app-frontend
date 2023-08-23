import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '../icons/icons.module';
import { PaginationNavigationTemplateComponent } from './components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './components/pagination-navigation/pagination-navigation.component';
import { PaginationOrderButtonTemplateComponent } from './components/pagination-order-button-template/pagination-order-button-template.component';
import { PageButtonComponent } from './components/pagination-page-button/pagination-page-button.component';
import { PaginationRouteNavigationComponent } from './components/pagination-route-navigation/pagination-route-navigation.component';
import { PaginationRouteOrderButtonComponent } from './components/pagination-route-order-button/pagination-route-order-button.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';
import { PaginationSizeSelectorComponent } from './components/pagination-size-selector/pagination-size-selector.component';



@NgModule({
  declarations: [
    PageButtonComponent,
    PaginationNavigationComponent,
    PaginationNavigationTemplateComponent,
    PaginationRouteNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent,
    PaginationOrderButtonTemplateComponent,
    PaginationRouteOrderButtonComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    FontAwesomeModule
  ],
  exports: [
    PaginationNavigationComponent,
    PaginationRouteNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent,
    PaginationRouteOrderButtonComponent
  ]
})
export class PaginationModule { }
