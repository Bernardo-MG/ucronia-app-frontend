import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMemberViewComponent } from './views/admin-member-view/admin-member-view.component';
import { AdminMembersRoutingModule } from './admin-members-routing.module';



@NgModule({
  declarations: [
    AdminMemberViewComponent
  ],
  imports: [
    CommonModule,
    AdminMembersRoutingModule
  ]
})
export class AdminMembersModule { }
