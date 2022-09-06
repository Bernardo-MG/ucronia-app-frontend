import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './views/free-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './views/free-list-view/fee-list-view.component';



@NgModule({
  declarations: [
    FeeFormComponent,
    FeeCreateViewComponent,
    FeeListViewComponent,
    FeeEditViewComponent
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
