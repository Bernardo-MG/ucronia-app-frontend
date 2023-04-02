import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MemberTabsComponent } from './components/member-tabs/member-tabs.component';
import { MemberCreateViewComponent } from './containers/member-create-view/member-create-view.component';
import { MemberEditViewComponent } from './containers/member-edit-view/member-edit-view.component';
import { MemberListViewComponent } from './containers/member-list-view/member-list-view.component';
import { MemberStatsViewComponent } from './containers/member-stats-view/member-stats-view.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MemberFormComponent,
    MemberListViewComponent,
    MemberEditViewComponent,
    MemberCreateViewComponent,
    MemberStatsViewComponent,
    MemberTabsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    ButtonsModule
  ],
  exports: [
    MemberFormComponent
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
