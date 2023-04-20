import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ArticleComponent } from './components/article/article.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { DynamicFormBodyComponent } from './components/dynamic-form-body/dynamic-form-body.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormFrameComponent } from './components/form-frame/form-frame.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';



@NgModule({
  declarations: [
    FormFrameComponent,
    DataListComponent,
    WaitingWrapperComponent,
    DynamicFormBodyComponent,
    ArticleComponent,
    DynamicFormComponent,
    ButtonListComponent
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
    DynamicFormComponent,
    ButtonListComponent
  ]
})
export class LayoutModule { }
