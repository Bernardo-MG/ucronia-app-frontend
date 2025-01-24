import { Component } from '@angular/core';
import { FeeCalendarWidgetContainer } from '@app/association-admin/fees/calendar/containers/fee-calendar-widget/fee-calendar-widget.container';
import { FeePaymentChartWidgetContainer } from '@app/association-admin/fees/chart/containers/fee-payment-chart-widget/fee-payment-chart-widget.container';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';

@Component({
    selector: 'assoc-fee-listing',
    imports: [FeeCalendarWidgetContainer, ArticleComponent, FeePaymentChartWidgetContainer, ResponsiveShortColumnsDirective],
    templateUrl: './fee-listing.container.html'
})
export class FeeListingContainer {

}
