import { Component } from '@angular/core';
import { FeeCalendarWidgetContainer } from '@app/association-admin/fees/calendar/containers/fee-calendar/fee-calendar';
import { FeePaymentChart } from '@app/association-admin/fees/chart/containers/fee-payment-chart/fee-payment-chart';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-fee-list',
  imports: [FeeCalendarWidgetContainer, FeePaymentChart, ResponsiveShortColumnsDirective],
  templateUrl: './fee-list.html'
})
export class FeeList {

}
