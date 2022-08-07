import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';
import { MemberInfoViewComponent } from './views/member-info-view/member-info-view.component';
import { MemberRoutingModule } from './members-routing.module';



@NgModule({
  declarations: [
    MemberListViewComponent,
    MemberInfoViewComponent
  ],
  imports: [
    MemberRoutingModule,
    CommonModule
  ]
})
export class MembersModule { }
