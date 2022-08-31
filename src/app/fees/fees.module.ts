import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';



@NgModule({
  declarations: [
    FeeFormComponent,
    FeeCreateViewComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  exports: [
    FeeFormComponent,
    FeeCreateViewComponent
  ]
})
export class FeesModule { }
