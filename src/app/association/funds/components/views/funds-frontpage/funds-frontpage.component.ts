import { Component } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FundsCurrentBalanceComponent } from '../../balance/transaction-current-balance/transaction-current-balance.component';
import { TransactionCalendarWidgetComponent } from '../../calendar/transaction-calendar-widget/transaction-calendar-widget.component';
import { TransactionBalanceChartWidgetComponent } from '../../chart/transaction-balance-chart-widget/transaction-balance-chart-widget.component';

@Component({
  selector: 'app-transaction-frontpage',
  standalone: true,
  imports: [IconsModule, TransactionBalanceChartWidgetComponent, FundsCurrentBalanceComponent, TransactionCalendarWidgetComponent, ArticleComponent],
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

}
