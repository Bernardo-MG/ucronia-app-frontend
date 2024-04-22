import { Component } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FundsCurrentBalanceWidgetComponent } from '../../balance/transaction-current-balance-widget/transaction-current-balance-widget.component';
import { TransactionCalendarWidgetComponent } from '../../calendar/transaction-calendar-widget/transaction-calendar-widget.component';
import { TransactionBalanceChartWidgetComponent } from '../../chart/transaction-balance-chart-widget/transaction-balance-chart-widget.component';

@Component({
  selector: 'app-transaction-frontpage',
  standalone: true,
  imports: [IconsModule, TransactionBalanceChartWidgetComponent, FundsCurrentBalanceWidgetComponent, TransactionCalendarWidgetComponent, ArticleComponent],
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

}
