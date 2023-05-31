import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StringInputComponent } from './components/string-input/string-input.component';



@NgModule({
  declarations: [
    StringInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringInputComponent
  ]
})
export class InputModule { }
