import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationSizeSelectorComponent } from '@app/shared/pagination/containers/pagination-size-selector/pagination-size-selector.component';
import { IconsModule } from '../icons/icons.module';
import { PaginationNavigationTemplateComponent } from './components/pagination-navigation-template/pagination-navigation-template.component';
import { PaginationNavigationComponent } from './components/pagination-navigation/pagination-navigation.component';
import { PageButtonComponent } from './components/pagination-page-button/pagination-page-button.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';
import { PaginationRouteNavigationComponent } from './containers/pagination-route-navigation/pagination-route-navigation.component';



@NgModule({
  declarations: [
    PageButtonComponent,
    PaginationNavigationComponent,
    PaginationNavigationTemplateComponent,
    PaginationRouteNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    PaginationNavigationComponent,
    PaginationRouteNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent
  ]
})
export class PaginationModule { }
