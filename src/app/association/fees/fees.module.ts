import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeeCalendarInfoComponent } from './containers/fee-calendar-info/fee-calendar-info.component';
import { FeeCreateComponent } from './containers/fee-create/fee-create.component';
import { FeeDetailsComponent } from './containers/fee-details/fee-details.component';
import { FeeListComponent } from './containers/fee-list/fee-list.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeService } from './services/fee.service';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { MemberSelectionInputComponent } from './components/member-selection-input/member-selection-input.component';



@NgModule({
  declarations: [
    FeeCalendarComponent,
    FeeCalendarInfoComponent,
    FeeCreateComponent,
    FeeListComponent,
    FeeDetailsComponent,
    MemberSelectionComponent,
    FeeFormComponent,
    MemberSelectionInputComponent
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
    EditionModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
