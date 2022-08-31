import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlsModule } from '@app/controls/controls.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { AdminBalanceViewComponent } from './views/admin-balance-view/admin-balance-view.component';



@NgModule({
  declarations: [
    AdminBalanceViewComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    ControlsModule
  ]
})
export class BalanceModule { }
