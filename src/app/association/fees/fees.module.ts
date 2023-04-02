import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeTabsComponent } from './components/fee-tabs/fee-tabs.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeService } from './services/fee.service';
import { FeeCalendarViewComponent } from './containers/fee-calendar-view/fee-calendar-view.component';
import { FeeCreateViewComponent } from './containers/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './containers/fee-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './containers/fee-list-view/fee-list-view.component';



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
    FontAwesomeModule,
    CoreModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
