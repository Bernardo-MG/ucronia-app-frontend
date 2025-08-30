
import { Component, inject } from '@angular/core';
import { FeePaymentReport } from '@app/domain/fees/fee-payment-report';
import { CardModule } from 'primeng/card';
import { FeePaymentChartComponent } from '../../components/fee-payment-chart/fee-payment-chart.component';
import { FeeReportService } from '../../services/fee-report.service';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  imports: [CardModule, FeePaymentChartComponent],
  templateUrl: './fee-payment-chart-widget.container.html'
})
export class FeePaymentChartWidgetContainer {

  public report = new FeePaymentReport();

  constructor() {
    const service = inject(FeeReportService);

    this.report.paid = 0;
    this.report.unpaid = 0;

    service.getPaymentReport().subscribe({
      next: response => {
        this.report = response;
      },
      error: error => {
      }
    });
  }

}
