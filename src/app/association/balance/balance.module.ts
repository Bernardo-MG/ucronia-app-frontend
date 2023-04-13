import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceInfoComponent } from './containers/balance-info/balance-info.component';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    BalanceInfoComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    CoreModule,
    LayoutModule
  ]
})
export class BalanceModule { }
