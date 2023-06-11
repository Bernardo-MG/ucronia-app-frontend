import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ArticleComponent } from './components/article/article.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';
import { EditionWrapperComponent } from './components/edition-wrapper/edition-wrapper.component';
import { WaitingButtonComponent } from './components/waiting-button/waiting-button.component';



@NgModule({
  declarations: [
    DataListComponent,
    WaitingWrapperComponent,
    ArticleComponent,
    ButtonListComponent,
    EditionWrapperComponent,
    WaitingButtonComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    PaginationModule
  ],
  exports: [
    DataListComponent,
    WaitingWrapperComponent,
    ArticleComponent,
    ButtonListComponent,
    EditionWrapperComponent
  ]
})
export class LayoutModule { }
