import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedModule } from '@app/shared/shared.module';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeeCalendarInfoComponent } from './containers/fee-calendar-info/fee-calendar-info.component';
import { FeeCreateComponent } from './containers/fee-create/fee-create.component';
import { FeeEditComponent } from './containers/fee-edit/fee-edit.component';
import { FeeListComponent } from './containers/fee-list/fee-list.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeService } from './services/fee.service';
import { LayoutModule } from '@app/shared/layout/layout.module';



@NgModule({
  declarations: [
    FeeCalendarComponent,
    FeeCalendarInfoComponent,
    FeeFormComponent,
    FeeCreateComponent,
    FeeListComponent,
    FeeEditComponent,
    MemberSelectionComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    IconsModule,
    PaginationModule,
    LayoutModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
