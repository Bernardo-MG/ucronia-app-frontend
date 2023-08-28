import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionCalendarComponent } from './components/transaction-calendar/transaction-calendar.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';
import { TransactionLayoutComponent } from './components/transaction-layout/transaction-layout.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionSelectionListComponent } from './components/transaction-selection-list/transaction-selection-list.component';
import { TransactionCalendarService } from './service/transaction-calendar.service';
import { TransactionService } from './service/transaction.service';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionCalendarInfoComponent } from './components/transaction-calendar-info/transaction-calendar-info.component';



@NgModule({
  declarations: [
    TransactionCreateComponent,
    TransactionListComponent,
    TransactionDetailsComponent,
    TransactionCalendarComponent,
    TransactionFormComponent,
    TransactionInfoComponent,
    TransactionLayoutComponent,
    TransactionSelectionListComponent,
    TransactionCalendarInfoComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CalendarModule,
    PaginationModule,
    LayoutModule,
    FontAwesomeModule,
    MenuModule
  ],
  providers: [
    TransactionService,
    TransactionCalendarService
  ]
})
export class TransactionsModule { }
