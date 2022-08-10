import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberRoutingModule } from './members-routing.module';
import { AdminMemberInfoViewComponent } from './views/admin-member-info-view/admin-member-info-view.component';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';
import { AdminMemberCreateViewComponent } from './views/admin-member-create-view/admin-member-create-view.component';



@NgModule({
  declarations: [
    AdminMemberListViewComponent,
    AdminMemberInfoViewComponent,
    AdminMemberCreateViewComponent
  ],
  imports: [
    MemberRoutingModule,
    FontAwesomeModule,
    CommonModule
  ]
})
export class MembersModule { }
