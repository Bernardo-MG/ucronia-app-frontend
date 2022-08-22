import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeTableFormComponent } from './components/fee-table-form/fee-table-form.component';
import { FeeTableComponent } from './components/fee-table/fee-table.component';
import { FeesRoutingModule } from './fees-routing.module';
import { AdminFeeEditViewComponent } from './views/admin-fee-edit-view/admin-fee-edit-view.component';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';



@NgModule({
  declarations: [
    AdminFeeListViewComponent,
    FeeTableComponent,
    AdminFeeEditViewComponent,
    FeeTableFormComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    FontAwesomeModule,
    ControlsModule
  ]
})
export class FeesModule { }
