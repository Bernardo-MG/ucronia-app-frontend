import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationSizeSelectorComponent } from '@app/shared/pagination/containers/pagination-size-selector/pagination-size-selector.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '../icons/icons.module';
import { PaginationNavigationTemplateComponent } from './components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './components/pagination-navigation/pagination-navigation.component';
import { PaginationOrderButtonTemplateComponent } from './components/pagination-order-button-template/pagination-order-button-template.component';
import { PageButtonComponent } from './components/pagination-page-button/pagination-page-button.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';
import { PaginationOrderButtonComponent } from './containers/pagination-order-button/pagination-order-button.component';
import { PaginationRouteNavigationComponent } from './containers/pagination-route-navigation/pagination-route-navigation.component';



@NgModule({
  declarations: [
    PageButtonComponent,
    PaginationNavigationComponent,
    PaginationNavigationTemplateComponent,
    PaginationRouteNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent,
    PaginationOrderButtonTemplateComponent,
    PaginationOrderButtonComponent
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
    PaginationOrderButtonComponent
  ]
})
export class PaginationModule { }
