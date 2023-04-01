import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { AdminBalanceViewComponent } from './views/admin-balance-view/admin-balance-view.component';



@NgModule({
  declarations: [
    AdminBalanceViewComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    CoreModule
  ]
})
export class BalanceModule { }
