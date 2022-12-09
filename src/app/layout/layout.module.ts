import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { DataListComponent } from './data-list/data-list.component';

@NgModule({
  declarations: [
    DataListComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ApiUiModule
  ],
  exports: [
    DataListComponent
  ]
})
export class LayoutModule { }
