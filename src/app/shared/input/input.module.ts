import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BooleanInputComponent } from './components/boolean-input/boolean-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { MonthInputComponent } from './components/month-input/month-input.component';
import { StringInputComponent } from './components/string-input/string-input.component';



@NgModule({
  declarations: [
    StringInputComponent,
    BooleanInputComponent,
    NumberInputComponent,
    DateInputComponent,
    MonthInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    StringInputComponent,
    BooleanInputComponent,
    NumberInputComponent,
    DateInputComponent,
    MonthInputComponent
  ]
})
export class InputModule { }
