import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlsModule } from '@app/controls/controls.module';
import { MembersModule } from '@app/members/members.module';
import { AdminMembersRoutingModule } from './admin-members-routing.module';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';



@NgModule({
  declarations: [
    AdminMemberListViewComponent
  ],
  imports: [
    CommonModule,
    AdminMembersRoutingModule,
    ControlsModule,
    MembersModule
  ]
})
export class AdminMembersModule { }
