import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SharedModule } from '@app/shared/shared.module';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeTabsComponent } from './components/fee-tabs/fee-tabs.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeeCalendarViewComponent } from './containers/fee-calendar-view/fee-calendar-view.component';
import { FeeCreateViewComponent } from './containers/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './containers/fee-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './containers/fee-list-view/fee-list-view.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeService } from './services/fee.service';



@NgModule({
  declarations: [
    FeeCalendarViewComponent,
    FeeCalendarComponent,
    FeeFormComponent,
    FeeCreateViewComponent,
    FeeListViewComponent,
    FeeEditViewComponent,
    MemberSelectionComponent,
    FeeTabsComponent
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
    ButtonsModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
