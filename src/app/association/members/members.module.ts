import { NgModule } from '@angular/core';
import { MembersRoutingModule } from './members-routing.module';
import { MemberBalanceService } from './services/member-balance.service';
import { MemberService } from './services/member.service';



@NgModule({
  imports: [
    MembersRoutingModule
  ],
  providers: [
    MemberService,
    MemberBalanceService
  ]
})
export class MembersModule { }
