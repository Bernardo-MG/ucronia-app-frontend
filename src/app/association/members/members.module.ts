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
import { MemberFrontpageComponent } from './components/member-frontpage/member-frontpage.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberService } from './services/member.service';
import { MemberSelectionListComponent } from './components/member-selection-list/member-selection-list.component';



@NgModule({
  declarations: [
    MemberFrontpageComponent,
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberCreateFormComponent,
    MemberEditionFormComponent,
    MemberInfoComponent,
    MemberSelectionListComponent
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
