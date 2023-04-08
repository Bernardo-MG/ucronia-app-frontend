import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MemberTabsComponent } from './components/member-tabs/member-tabs.component';
import { MemberCreateViewComponent } from './containers/member-create/member-create.component';
import { MemberEditViewComponent } from './containers/member-edit/member-edit.component';
import { MemberListViewComponent } from './containers/member-list/member-list.component';
import { MemberStatsViewComponent } from './containers/member-stats/member-stats.component';
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
    PaginationModule,
    IconsModule
  ],
  exports: [
    MemberFormComponent
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
