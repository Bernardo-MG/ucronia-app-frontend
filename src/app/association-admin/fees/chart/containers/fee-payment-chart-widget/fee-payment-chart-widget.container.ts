import { Component, OnInit } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { FeePaymentChartComponent } from '../../components/fee-payment-chart/fee-payment-chart.component';
import { FeeReportService } from '../../services/fee-report.service';

@Component({
    selector: 'assoc-fee-payment-chart-widget',
    imports: [FeePaymentChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent],
    templateUrl: './fee-payment-chart-widget.container.html'
})
export class FeePaymentChartWidgetContainer implements OnInit {

  public report = new FeePaymentReport();

  constructor(
    private feeReportService: FeeReportService
  ) { }

  ngOnInit(): void {
    this.feeReportService.getPaymentReport().subscribe({
      next: response => {
        this.report = response;
      },
      error: error => {
      }
    });
  }

}
