import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FeeCalendarWidgetComponent } from '../../calendar/fee-calendar-widget/fee-calendar-widget.component';
import { FeePaymentChartWidgetComponent } from '../../report/fee-payment-chart-widget/fee-payment-chart-widget.component';

@Component({
  selector: 'assoc-fee-frontpage',
  standalone: true,
  imports: [FeeCalendarWidgetComponent, ArticleComponent, FeePaymentChartWidgetComponent],
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent {

}
