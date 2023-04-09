import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { DataListComponent } from './components/data-list/data-list.component';
import { DataFormComponent } from './components/form-frame/form-frame.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    WaitingWrapperComponent,
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
    DataFormComponent,
    DataListComponent,
    WaitingWrapperComponent
  ]
})
export class LayoutModule { }
