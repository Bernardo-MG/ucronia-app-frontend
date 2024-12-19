import { Component } from '@angular/core';
import { TransactionReportWidgetContainer } from '@app/association-admin/funds/report/containers/transaction-report-widget/transaction-report-widget.container';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FundsCurrentBalanceWidgetComponent } from '../../../balance/components/transaction-current-balance-widget/transaction-current-balance-widget.component';
import { TransactionCalendarWidgetComponent } from '../../../calendar/components/transaction-calendar-widget/transaction-calendar-widget.component';
import { TransactionBalanceChartWidgetComponent } from '../../../chart/components/transaction-balance-chart-widget/transaction-balance-chart-widget.component';

@Component({
  selector: 'app-transaction-frontpage',
  standalone: true,
  imports: [IconsModule, CardModule, TransactionBalanceChartWidgetComponent, FundsCurrentBalanceWidgetComponent, TransactionCalendarWidgetComponent, ArticleComponent, TransactionReportWidgetContainer],
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

}
