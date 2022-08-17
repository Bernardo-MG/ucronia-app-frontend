import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeeListViewComponent } from './views/admin-fee-list-view/admin-fee-list-view.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeFormComponent } from './components/fee-form/fee-form.component';



@NgModule({
  declarations: [
    AdminFeeListViewComponent,
    FeeFormComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule
  ]
})
export class FeesModule { }
