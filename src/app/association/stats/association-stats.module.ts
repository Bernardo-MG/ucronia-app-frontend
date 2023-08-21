import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberStatsComponent } from './components/member-stats/member-stats.component';
import { BalanceInfoComponent } from './components/balance-info/balance-info.component';



@NgModule({
  declarations: [
    MemberStatsComponent,
    BalanceInfoComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    LayoutModule
  ],
  exports: [
    MemberStatsComponent,
    BalanceInfoComponent
  ]
})
export class AssociationStatsModule { }
