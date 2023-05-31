import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BooleanInputComponent } from './components/boolean-input/boolean-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DecimalInputComponent } from './components/decimal-input/decimal-input.component';
import { MonthInputComponent } from './components/month-input/month-input.component';
import { StringInputComponent } from './components/string-input/string-input.component';



@NgModule({
  declarations: [
    StringInputComponent,
    BooleanInputComponent,
    DecimalInputComponent,
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
    DecimalInputComponent,
    DateInputComponent,
    MonthInputComponent
  ]
})
export class InputModule { }
