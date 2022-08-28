import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeTableComponent } from './components/fee-table/fee-table.component';
import { FeesRoutingModule } from './fees-routing.module';
import { AdminFeeCreateViewComponent } from './views/admin-fee-create-view/admin-fee-create-view.component';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';



@NgModule({
  declarations: [
    AdminFeeListViewComponent,
    FeeTableComponent,
    AdminFeeCreateViewComponent,
    FeeFormComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule
  ]
})
export class FeesModule { }
