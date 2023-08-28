import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ArticleComponent } from './components/article/article.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { EditionWrapperComponent } from './components/edition-wrapper/edition-wrapper.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { WaitingButtonComponent } from './components/waiting-button/waiting-button.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';



@NgModule({
  declarations: [
    WaitingWrapperComponent,
    ArticleComponent,
    ButtonListComponent,
    EditionWrapperComponent,
    WaitingButtonComponent,
    LinkListComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    PaginationModule
  ],
  exports: [
    WaitingWrapperComponent,
    ArticleComponent,
    ButtonListComponent,
    EditionWrapperComponent,
    WaitingButtonComponent,
    LinkListComponent
  ]
})
export class LayoutModule { }
