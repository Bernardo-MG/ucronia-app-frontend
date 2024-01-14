import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarService } from '../membership/services/fee-calendar.service';
import { FeeService } from '../membership/services/fee.service';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeEditFormComponent } from './components/fee-edit-form/fee-edit-form.component';
import { FeeFrontpageComponent } from './components/fee-frontpage/fee-frontpage.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { FeeMemberSelectionComponent } from './components/fee-member-selection/fee-member-selection.component';
import { FeePayFormComponent } from './components/fee-pay-form/fee-pay-form.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';
import { FeesRoutingModule } from './fees-routing.module';



@NgModule({
  declarations: [
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
    FeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule,
  ],
  exports: [
    FeeCalendarComponent,
    FeeFrontpageComponent,
    FeeDetailsComponent,
    FeeMemberSelectionComponent,
    FeeEditFormComponent,
    FeePayFormComponent,
    FeeInfoComponent,
    FeePayComponent
  ],
  providers: [
    FeeCalendarService,
    FeeService
  ]
})
export class FeesModule { }
