import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeCalendarService } from './services/fee-calendar.service';
import { FeeService } from './services/fee.service';



@NgModule({
  imports: [
    CommonModule,
    FeesRoutingModule
  ],
  providers: [
    FeeCalendarService,
    FeeService
  ]
})
export class FeesModule { }
