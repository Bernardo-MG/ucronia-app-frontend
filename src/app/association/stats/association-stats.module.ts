import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { BalanceInfoComponent } from './components/balance-info/balance-info.component';



@NgModule({
  declarations: [
    BalanceInfoComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    LayoutModule
  ],
  exports: [
    BalanceInfoComponent
  ]
})
export class AssociationStatsModule { }
