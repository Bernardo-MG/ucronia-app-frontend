import { Component } from '@angular/core';
import { TransactionBalanceChartWidgetComponent } from '@app/association/transactions/components/chart/transaction-balance-chart-widget/transaction-balance-chart-widget.component';
import { TransactionCalendarWidgetComponent } from '@app/association/transactions/components/calendar/transaction-calendar-widget/transaction-calendar-widget.component';
import { FundsCurrentBalanceComponent } from '@app/association/transactions/components/balance/transaction-current-balance/transaction-current-balance.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';

@Component({
  selector: 'app-transaction-frontpage',
  standalone: true,
  imports: [IconsModule, TransactionBalanceChartWidgetComponent, FundsCurrentBalanceComponent, TransactionCalendarWidgetComponent, ArticleComponent],
  templateUrl: './funds-frontpage.component.html'
})
export class FundsFrontpageComponent {

}
