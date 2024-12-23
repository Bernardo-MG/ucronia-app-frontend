import { Component } from '@angular/core';
import { TransactionBalanceChartWidgetContainer } from '@app/association-admin/funds/chart/containers/transaction-balance-chart-widget/transaction-balance-chart-widget.container';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FundsCurrentBalanceWidgetContainer } from '../../../balance/containers/transaction-current-balance-widget/transaction-current-balance-widget.container';
import { TransactionCalendarWidgetContainer } from '../../../calendar/containers/transaction-calendar-widget/transaction-calendar-widget.container';

@Component({
  selector: 'app-transaction-listing',
  standalone: true,
  imports: [IconsModule, CardModule, TransactionBalanceChartWidgetContainer, FundsCurrentBalanceWidgetContainer, TransactionCalendarWidgetContainer, ArticleComponent, TransactionReportWidgetContainer],
  templateUrl: './funds-listing.container.html'
})
export class FundsListingComponent {

}
