
import { Component, inject, OnDestroy } from '@angular/core';
import { FeePaymentReport } from '@app/domain/fees/fee-payment-report';
import Chart from 'chart.js/auto';
import { CardModule } from 'primeng/card';
import { FeeReportService } from '../../services/fee-report-service';

@Component({
  selector: 'assoc-fee-payment-chart',
  imports: [CardModule],
  templateUrl: './fee-payment-chart.html'
})
export class FeePaymentChart implements OnDestroy {

  public report = new FeePaymentReport();

  public chart: any;

  constructor() {
    const service = inject(FeeReportService);

    this.report.paid = 0;
    this.report.unpaid = 0;

    service.getPaymentReport().subscribe({
      next: response => {
        this.loadChart(response);
      },
      error: error => {
      }
    });
  }
  
  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadChart(report: FeePaymentReport) {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = ['Pagado', 'No pagado'];
    const payments = [report.paid, report.unpaid];

    const data = {
      labels: labels,
      datasets: [
        {
          data: payments,
          backgroundColor: ["#51EAEA", "#FCDDB0"]
        },
      ],
    };
    this.chart = new Chart('feePaymentChart', {
      type: 'pie',
      data
    });
  }

}
