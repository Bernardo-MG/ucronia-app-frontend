import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberCreateComponent } from './containers/member-create/member-create.component';
import { MemberEditComponent } from './containers/member-edit/member-edit.component';
import { MemberListComponent } from './containers/member-list/member-list.component';
import { MemberStatsComponent } from './containers/member-stats/member-stats.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MemberListComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberStatsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    IconsModule,
    LayoutModule
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
