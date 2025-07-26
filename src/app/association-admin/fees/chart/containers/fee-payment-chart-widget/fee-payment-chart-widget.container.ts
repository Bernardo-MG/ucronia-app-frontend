import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { CardModule } from 'primeng/card';
import { FeePaymentChartComponent } from '../../components/fee-payment-chart/fee-payment-chart.component';
import { FeeReportService } from '../../services/fee-report.service';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  imports: [CommonModule, CardModule, FeePaymentChartComponent],
  templateUrl: './fee-payment-chart-widget.container.html'
})
export class FeePaymentChartWidgetContainer {

  public report = new FeePaymentReport();

  constructor() {
    const service = inject(FeeReportService);

    service.getPaymentReport().subscribe({
      next: response => {
        this.report = response;
      },
      error: error => {
      }
    });
  }

}
