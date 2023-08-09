import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeCalendarInfoComponent } from './components/fee-calendar-info/fee-calendar-info.component';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeCreateComponent } from './components/fee-create/fee-create.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeFormComponent } from './components/fee-form/fee-form.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { FeeLayoutComponent } from './components/fee-layout/fee-layout.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
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
    FeeFormComponent,
    FeeInfoComponent,
    FeeLayoutComponent
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
    FontAwesomeModule,
    MenuModule
  ],
  providers: [
    FeeService
  ]
})
export class FeesModule { }
