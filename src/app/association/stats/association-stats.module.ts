import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberStatsComponent } from './components/member-stats/member-stats.component';
import { ActiveMembersListComponent } from './components/active-members-list/active-members-list.component';



@NgModule({
  declarations: [
    MemberStatsComponent,
    ActiveMembersListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MemberStatsComponent,
    ActiveMembersListComponent
  ]
})
export class AssociationStatsModule { }
