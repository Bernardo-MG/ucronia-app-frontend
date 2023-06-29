import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { ActiveMembersListComponent } from './components/active-members-list/active-members-list.component';
import { MemberStatsComponent } from './components/member-stats/member-stats.component';



@NgModule({
  declarations: [
    MemberStatsComponent,
    ActiveMembersListComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    LayoutModule
  ],
  exports: [
    MemberStatsComponent,
    ActiveMembersListComponent
  ]
})
export class AssociationStatsModule { }
