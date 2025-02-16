import { Component } from '@angular/core';
import { FeeCalendarWidgetContainer } from '@app/association-admin/fees/calendar/containers/fee-calendar-widget/fee-calendar-widget.container';
import { FeePaymentChartWidgetContainer } from '@app/association-admin/fees/chart/containers/fee-payment-chart-widget/fee-payment-chart-widget.container';
import { BreadcrumbLink } from '@app/core/layout/model/breadcrumb-link';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-fee-listing',
    imports: [FeeCalendarWidgetContainer, ArticleComponent, FeePaymentChartWidgetContainer, ResponsiveShortColumnsDirective],
    templateUrl: './fee-listing.container.html'
})
export class FeeListingContainer {

  public levels = [new BreadcrumbLink('Cuotas', '')];

}
