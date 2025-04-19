import { Component } from '@angular/core';
import { FeeCalendarWidgetContainer } from '@app/association-admin/fees/calendar/containers/fee-calendar-widget/fee-calendar-widget.container';
import { FeePaymentChartWidgetContainer } from '@app/association-admin/fees/chart/containers/fee-payment-chart-widget/fee-payment-chart-widget.container';
import { ArticleComponent, BreadcrumbLink, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-fee-listing',
  imports: [FeeCalendarWidgetContainer, ArticleComponent, FeePaymentChartWidgetContainer, ResponsiveShortColumnsDirective],
  templateUrl: './fee-listing.container.html'
})
export class FeeListingContainer {

  public readonly levels = [new BreadcrumbLink('Cuotas')];

}
