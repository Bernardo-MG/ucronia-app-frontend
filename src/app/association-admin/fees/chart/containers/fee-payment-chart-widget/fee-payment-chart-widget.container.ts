import { Component, OnInit } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { CardModule } from '@app/shared/card/card.module';
import { FeeReportService } from '../../services/fee-report.service';
import { FeePaymentChartComponent } from '../../components/fee-payment-chart/fee-payment-chart.component';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  standalone: true,
  imports: [CardModule, FeePaymentChartComponent],
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
