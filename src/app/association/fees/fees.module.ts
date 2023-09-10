import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeeFrontpageComponent } from './components/fee-frontpage/fee-frontpage.component';
import { FeeCalendarComponent } from './components/fee-calendar/fee-calendar.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeEditFormComponent } from './components/fee-edit-form/fee-edit-form.component';
import { FeeInfoComponent } from './components/fee-info/fee-info.component';
import { FeeLayoutComponent } from './components/fee-layout/fee-layout.component';
import { FeePayFormComponent } from './components/fee-pay-form/fee-pay-form.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';
import { MemberSelectionComponent } from './components/member-selection/member-selection.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeCalendarService } from './services/fee-calendar.service';
import { FeeService } from './services/fee.service';



@NgModule({
  declarations: [
    FeeCalendarComponent,
    FeeFrontpageComponent,
    FeePayComponent,
    FeeDetailsComponent,
    MemberSelectionComponent,
    FeeEditFormComponent,
    FeePayFormComponent,
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
    FeeService,
    FeeCalendarService
  ]
})
export class FeesModule { }
