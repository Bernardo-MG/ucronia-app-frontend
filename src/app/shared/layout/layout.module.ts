import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { DataListComponent } from './components/data-list/data-list.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';



@NgModule({
  declarations: [
    FormFrameComponent,
    DataListComponent,
    WaitingWrapperComponent,
    DynamicFormBodyComponent,
    ArticleComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule,
    RouterModule,
    PaginationModule
  ],
  exports: [
    DataListComponent,
    WaitingWrapperComponent,
    DynamicFormComponent,
    ArticleComponent,
    FormFrameComponent,
    DynamicFormComponent
  ]
})
export class LayoutModule { }
