import { Component } from '@angular/core';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/chart/containers/transaction-balance-chart-widget/transaction-balance-chart-widget.container';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FundsCurrentBalanceWidgetContainer } from '../../../balance/containers/transaction-current-balance-widget/transaction-current-balance-widget.container';
import { TransactionCalendarWidgetContainer } from '../../../calendar/containers/transaction-calendar-widget/transaction-calendar-widget.container';

@Component({
    selector: 'app-transaction-listing',
    imports: [TransactionBalanceChartWidgetContainer, FundsCurrentBalanceWidgetContainer, TransactionCalendarWidgetContainer, ArticleComponent, TransactionReportWidgetContainer, CardComponent, CardBodyComponent, CardHeaderComponent],
    templateUrl: './funds-listing.container.html'
})
export class FundsListingComponent {

}
