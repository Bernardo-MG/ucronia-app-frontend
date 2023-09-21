import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeEditFormComponent } from './components/fee-edit-form/fee-edit-form.component';
import { FeeFrontpageComponent } from './components/fee-frontpage/fee-frontpage.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { FeeMemberSelectionComponent } from './components/fee-member-selection/fee-member-selection.component';
import { FeePayFormComponent } from './components/fee-pay-form/fee-pay-form.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';
import { MemberCreateFormComponent } from './components/member-create-form/member-create-form.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberEditionFormComponent } from './components/member-edit-form/member-edit-form.component';
import { MemberInfoComponent } from './components/member-info/member-info.component';
import { MemberSelectionListComponent } from './components/member-selection-list/member-selection-list.component';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';
import { MembershipRoutingModule } from './membership-routing.module';
import { FeeCalendarService } from './services/fee-calendar.service';
import { FeeService } from './services/fee.service';
import { MemberService } from './services/member.service';



@NgModule({
  declarations: [
    MembershipFrontpageComponent,
    MemberDetailsComponent,
    MemberCreateComponent,
    MemberCreateFormComponent,
    MemberEditionFormComponent,
    MemberInfoComponent,
    MemberSelectionListComponent,
    FeeCalendarComponent,
    FeeFrontpageComponent,
    FeeDetailsComponent,
    FeeMemberSelectionComponent,
    FeeEditFormComponent,
    FeePayFormComponent,
    FeeInfoComponent,
    FeePayComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule
  ],
  providers: [
    MemberService,
    FeeCalendarService,
    FeeService
  ]
})
export class MembershipModule { }
