import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { MemberSelectionInputComponent } from './components/member-selection-input/member-selection-input.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeeCalendarInfoComponent } from './containers/fee-calendar-info/fee-calendar-info.component';
import { FeeCreateComponent } from './containers/fee-create/fee-create.component';
import { FeeDetailsComponent } from './containers/fee-details/fee-details.component';
import { FeeListComponent } from './containers/fee-list/fee-list.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeService } from './services/fee.service';



@NgModule({
  declarations: [
    FeeCalendarComponent,
    FeeCalendarInfoComponent,
    FeeCreateComponent,
    FeeListComponent,
    FeeDetailsComponent,
    MemberSelectionComponent,
    MemberSelectionInputComponent,
    FeeFormComponent,
    FeeInfoComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    IconsModule,
    PaginationModule,
    LayoutModule,
    FontAwesomeModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
