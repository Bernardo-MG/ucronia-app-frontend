import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MembersRoutingModule } from './members-routing.module';
import { AdminMemberCreateViewComponent } from './views/admin-member-create-view/admin-member-create-view.component';
import { AdminMemberEditViewComponent } from './views/admin-member-edit-view/admin-member-edit-view.component';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';



@NgModule({
  declarations: [
    AdminMemberListViewComponent,
    AdminMemberEditViewComponent,
    AdminMemberCreateViewComponent,
    MemberFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MembersRoutingModule,
    ControlsModule
  ]
})
export class MembersModule { }
