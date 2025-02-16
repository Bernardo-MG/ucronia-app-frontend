import { Component } from '@angular/core';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/chart/containers/transaction-balance-chart-widget/transaction-balance-chart-widget.container';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { ArticleComponent, CardBodyComponent, CardComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { FundsCurrentBalanceWidgetContainer } from '../../../balance/containers/transaction-current-balance-widget/transaction-current-balance-widget.container';
import { TransactionCalendarWidgetContainer } from '../../../calendar/containers/transaction-calendar-widget/transaction-calendar-widget.container';

@Component({
    selector: 'app-transaction-listing',
    imports: [TransactionBalanceChartWidgetContainer, FundsCurrentBalanceWidgetContainer, TransactionCalendarWidgetContainer, ArticleComponent, TransactionReportWidgetContainer, CardComponent, CardBodyComponent, CardHeaderComponent],
    templateUrl: './funds-listing.container.html'
})
export class FundsListingComponent {

}
