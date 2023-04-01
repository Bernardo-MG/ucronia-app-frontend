import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { CoreModule } from '@app/core/core.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MemberTabsComponent } from './components/member-tabs/member-tabs.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';
import { MemberCreateViewComponent } from './views/member-create-view/member-create-view.component';
import { MemberEditViewComponent } from './views/member-edit-view/member-edit-view.component';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';
import { MemberStatsViewComponent } from './views/member-stats-view/member-stats-view.component';



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
    ApiUiModule
  ],
  exports: [
    MemberFormComponent
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
