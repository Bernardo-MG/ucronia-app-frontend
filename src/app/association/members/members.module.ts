import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberEditFormComponent } from './components/member-edit-form/member-edit-form.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MemberCreateComponent } from './containers/member-create/member-create.component';
import { MemberDetailsComponent } from './containers/member-details/member-details.component';
import { MemberListComponent } from './containers/member-list/member-list.component';
import { MemberStatsComponent } from './containers/member-stats/member-stats.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberStatsComponent,
    MemberFormComponent,
    MemberEditFormComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    EditionModule
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
