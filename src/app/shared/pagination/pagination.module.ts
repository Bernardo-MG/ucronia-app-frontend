import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { PageButtonComponent } from './components/page-button/page-button.component';
import { PaginationTemplateComponent } from './components/pagination-template/pagination-template.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationNavigationComponent } from './containers/pagination-navigation/pagination-navigation.component';



@NgModule({
  declarations: [
    PageButtonComponent,
    PaginationComponent,
    PaginationTemplateComponent,
    PaginationNavigationComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    PaginationNavigationComponent,
    PaginationComponent
  ]
})
export class PaginationModule { }
