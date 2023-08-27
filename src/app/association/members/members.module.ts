import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberCreateFormComponent } from './components/member-create-form/member-create-form.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberEditionFormComponent } from './components/member-edit-form/member-edit-form.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberCreateFormComponent,
    MemberEditionFormComponent,
    MemberInfoComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule
  ],
  providers: [
    MemberService
  ]
})
export class MembersModule { }
