import { Component } from '@angular/core';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/chart/containers/transaction-balance-chart-widget/transaction-balance-chart-widget.container';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { FundsCurrentBalanceWidgetContainer } from '../../balance/containers/transaction-current-balance-widget/transaction-current-balance-widget.container';
import { TransactionCalendarWidgetContainer } from '../../calendar/containers/transaction-calendar-widget/transaction-calendar-widget.container';

@Component({
  selector: 'app-funds',
  imports: [TransactionBalanceChartWidgetContainer, FundsCurrentBalanceWidgetContainer, TransactionCalendarWidgetContainer, TransactionReportWidgetContainer],
  templateUrl: './funds.html'
})
export class Funds {

}
