import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeEditFormComponent } from './components/fee-edit-form/fee-edit-form.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { FeeMemberSelectionComponent } from './components/fee-member-selection/fee-member-selection.component';
import { FeePayFormComponent } from './components/fee-pay-form/fee-pay-form.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';
import { FeeCalendarService } from './services/fee-calendar.service';
import { FeeService } from './services/fee.service';



@NgModule({
  declarations: [
    FeeCalendarComponent,
    FeeDetailsComponent,
    FeeMemberSelectionComponent,
    FeeEditFormComponent,
    FeePayFormComponent,
    FeeInfoComponent,
    FeePayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    LayoutModule,
    IconsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    FeeCalendarComponent,
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
