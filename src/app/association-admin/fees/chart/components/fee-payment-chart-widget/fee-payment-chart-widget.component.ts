import { Component, OnInit } from '@angular/core';
import { FeePaymentReport } from '@app/association-admin/fees/shared/models/fee-payment-report';
import { CardModule } from '@app/shared/card/card.module';
import { FeeReportService } from '../../services/fee-report.service';
import { FeePaymentChartComponent } from '../fee-payment-chart/fee-payment-chart.component';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  standalone: true,
  imports: [CardModule, FeePaymentChartComponent],
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
