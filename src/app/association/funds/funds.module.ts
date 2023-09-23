import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FundsBalanceChartComponent } from './components/funds-balance-chart/funds-balance-chart.component';
import { FundsCalendarComponent } from './components/funds-calendar/funds-calendar.component';
import { FundsCreateComponent } from './components/funds-create/funds-create.component';
import { FundsCurrentBalanceComponent } from './components/funds-current-balance/funds-current-balance.component';
import { FundsDetailsComponent } from './components/funds-details/funds-details.component';
import { FundsFormComponent } from './components/funds-form/funds-form.component';
import { FundsFrontpageComponent } from './components/funds-frontpage/funds-frontpage.component';
import { FundsInfoComponent } from './components/funds-info/funds-info.component';
import { FundsRoutingModule } from './funds-routing.module';
import { BalanceService } from './service/balance.service';
import { FundsCalendarService } from './service/funds-calendar.service';
import { TransactionService } from './service/transaction.service';



@NgModule({
  declarations: [
    FundsCreateComponent,
    FundsDetailsComponent,
    FundsCalendarComponent,
    FundsFormComponent,
    FundsInfoComponent,
    FundsFrontpageComponent,
    FundsBalanceChartComponent,
    FundsCurrentBalanceComponent
  ],
  imports: [
    CommonModule,
    FundsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ScheduleModule,
    PaginationModule,
    LayoutModule,
    FontAwesomeModule,
    MenuModule,
    IconsModule
  ],
  providers: [
    BalanceService,
    TransactionService,
    FundsCalendarService
  ]
})
export class FundsModule { }
