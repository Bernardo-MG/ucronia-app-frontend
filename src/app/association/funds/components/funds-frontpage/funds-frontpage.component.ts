import { Component } from '@angular/core';
import { TransactionBalanceChartComponent } from '@app/association/transactions/components/transaction-balance-chart/transaction-balance-chart.component';
import { TransactionCalendarWidgetComponent } from '@app/association/transactions/components/transaction-calendar-widget/transaction-calendar-widget.component';
import { FundsCurrentBalanceComponent } from '@app/association/transactions/components/transaction-current-balance/transaction-current-balance.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';

@Component({
  selector: 'app-transaction-frontpage',
  standalone: true,
  imports: [LayoutModule, IconsModule, TransactionBalanceChartComponent, FundsCurrentBalanceComponent, TransactionCalendarWidgetComponent],
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

}
