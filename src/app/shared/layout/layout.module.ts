import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ArticleComponent } from './components/article/article.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';



@NgModule({
  declarations: [
    DataListComponent,
    WaitingWrapperComponent,
    ArticleComponent,
    ButtonListComponent
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
    ButtonListComponent
  ]
})
export class LayoutModule { }
