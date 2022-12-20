import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { LayoutModule } from '@app/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeYearComponent } from './components/fee-year/fee-year.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeeService } from './services/fee.service';
import { AdminFeeYearViewComponent } from './views/admin-fee-year-view/admin-fee-year-view.component';
import { FeeCreateViewComponent } from './views/fee-create-view/fee-create-view.component';
import { FeeEditViewComponent } from './views/fee-edit-view/fee-edit-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { AdminFeeTabsComponent } from './components/admin-fee-tabs/admin-fee-tabs.component';



@NgModule({
  declarations: [
    AdminFeeYearViewComponent,
    FeeYearComponent,
    FeeFormComponent,
    FeeCreateViewComponent,
    FeeListViewComponent,
    FeeEditViewComponent,
    MemberSelectionComponent,
    AdminFeeTabsComponent
  ],
  imports: [
    CommonModule,
    FeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule,
    ApiUiModule,
    LayoutModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
