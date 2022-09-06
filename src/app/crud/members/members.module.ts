import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberCreateViewComponent } from './views/member-create-view/member-create-view.component';
import { MemberEditViewComponent } from './views/member-edit-view/member-edit-view.component';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';



@NgModule({
  declarations: [
    MemberFormComponent,
    MemberListViewComponent,
    MemberEditViewComponent,
    MemberCreateViewComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  exports: [
    MemberFormComponent
  ]
})
export class MembersModule { }
