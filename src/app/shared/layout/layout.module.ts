import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataFormComponent } from './components/form-frame/form-frame.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    DataFormComponent
  ]
})
export class LayoutModule { }
