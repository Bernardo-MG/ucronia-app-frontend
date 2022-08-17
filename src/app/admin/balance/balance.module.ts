import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBalanceViewComponent } from './views/admin-balance-view/admin-balance-view.component';
import { BalanceRoutingModule } from './balance-routing.module';



@NgModule({
  declarations: [
    AdminBalanceViewComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule
  ]
})
export class BalanceModule { }
