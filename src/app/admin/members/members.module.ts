import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberRoutingModule } from './members-routing.module';
import { AdminMemberCreateViewComponent } from './views/admin-member-create-view/admin-member-create-view.component';
import { AdminMemberInfoViewComponent } from './views/admin-member-edit-view/admin-member-edit-view.component';
import { AdminMemberListViewComponent } from './views/admin-member-list-view/admin-member-list-view.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { CustomFormsModule } from '@app/forms/forms.module';



@NgModule({
  declarations: [
    AdminMemberListViewComponent,
    AdminMemberInfoViewComponent,
    AdminMemberCreateViewComponent,
    MemberFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MemberRoutingModule,
    CustomFormsModule
  ]
})
export class MembersModule { }
