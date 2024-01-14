import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberBalanceService } from './services/member-balance.service';
import { MemberService } from './services/member.service';
import { MemberBalanceChartComponent } from './components/member-balance-chart/member-balance-chart.component';
import { MemberCreateFormComponent } from './components/member-create-form/member-create-form.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberEditionFormComponent } from './components/member-edit-form/member-edit-form.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberListComponent } from './components/member-list/member-list.component';



@NgModule({
  declarations: [
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberCreateFormComponent,
    MemberEditionFormComponent,
    MemberInfoComponent,
    MemberListComponent,
    MemberBalanceChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberCreateFormComponent,
    MemberEditionFormComponent,
    MemberInfoComponent,
    MemberListComponent,
    MemberBalanceChartComponent
  ],
  providers: [
    MemberService,
    MemberBalanceService
  ]
})
export class MembersModule { }
