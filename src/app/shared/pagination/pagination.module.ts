import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationSizeSelectorComponent } from '@app/shared/pagination/containers/pagination-size-selector/pagination-size-selector.component';
import { IconsModule } from '../icons/icons.module';
import { PageButtonComponent } from './components/pagination-page-button/pagination-page-button.component';
import { PaginationTemplateComponent } from './components/pagination-template/pagination-template.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationNavigationComponent } from './containers/pagination-navigation/pagination-navigation.component';
import { PaginationSizeSelectorTemplateComponent } from './components/pagination-size-selector-template/pagination-size-selector-template.component';



@NgModule({
  declarations: [
    PageButtonComponent,
    PaginationComponent,
    PaginationTemplateComponent,
    PaginationNavigationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    PaginationNavigationComponent,
    PaginationComponent,
    PaginationSizeSelectorTemplateComponent,
    PaginationSizeSelectorComponent
  ]
})
export class PaginationModule { }
