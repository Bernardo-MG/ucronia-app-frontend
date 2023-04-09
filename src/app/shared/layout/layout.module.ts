import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { PaginationModule } from '../pagination/pagination.module';
import { DataListComponent } from './components/data-list/data-list.component';
import { DataFormComponent } from './components/form-frame/form-frame.component';
import { WaitingWrapperComponent } from './components/waiting-wrapper/waiting-wrapper.component';



@NgModule({
  declarations: [
    DataFormComponent,
    DataListComponent,
    WaitingWrapperComponent
  ],
  imports: [
    CommonModule,
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
