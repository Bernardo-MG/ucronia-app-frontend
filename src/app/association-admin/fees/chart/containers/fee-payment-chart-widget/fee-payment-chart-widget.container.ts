import { Component } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@bernardo-mg/ui';
import { FeePaymentChartComponent } from '../../components/fee-payment-chart/fee-payment-chart.component';
import { FeeReportService } from '../../services/fee-report.service';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  imports: [FeePaymentChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent],
  templateUrl: './fee-payment-chart-widget.container.html'
})
export class FeePaymentChartWidgetContainer {

  public report = new FeePaymentReport();

  constructor(
    service: FeeReportService
  ) {
    service.getPaymentReport().subscribe({
      next: response => {
        this.report = response;
      },
      error: error => {
      }
    });
  }

}
