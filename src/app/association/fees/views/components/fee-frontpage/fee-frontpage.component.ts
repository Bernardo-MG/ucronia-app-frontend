import { Component } from '@angular/core';
import { FeeCalendarWidgetComponent } from '@app/association/fees/calendar/components/fee-calendar-widget/fee-calendar-widget.component';
import { FeePaymentChartWidgetComponent } from '@app/association/fees/chart/components/fee-payment-chart-widget/fee-payment-chart-widget.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';

@Component({
  selector: 'assoc-fee-frontpage',
  standalone: true,
  imports: [FeeCalendarWidgetComponent, ArticleComponent, FeePaymentChartWidgetComponent, JustifyCenterDirective, ResponsiveShortColumnsDirective],
  templateUrl: './fee-frontpage.component.html'
})
export class FeeFrontpageComponent {

}
