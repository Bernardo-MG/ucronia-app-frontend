import { Component, OnInit } from '@angular/core';
import { FeePaymentReport } from '@app/association/fees/models/fee-payment-report';
import { FeeReportService } from '@app/association/fees/services/fee-report.service';
import { FeePaymentChartComponent } from '../fee-payment-chart/fee-payment-chart.component';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  standalone: true,
  imports: [FeePaymentChartComponent],
  templateUrl: './fee-payment-chart-widget.component.html'
})
export class FeePaymentChartWidgetComponent implements OnInit {

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
