import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { FeesModule } from '@app/crud/fees/fees.module';
import { AdminFeesRoutingModule } from './admin-fees-routing.module';
import { FeeYearComponent } from './components/fee-year/fee-year.component';
import { AdminFeeYearViewComponent } from './views/admin-fee-year-view/admin-fee-year-view.component';



@NgModule({
  declarations: [
    AdminFeeYearViewComponent,
    FeeYearComponent
  ],
  imports: [
    CommonModule,
    AdminFeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FeesModule,
    ControlsModule
  ]
})
export class AdminFeesModule { }
