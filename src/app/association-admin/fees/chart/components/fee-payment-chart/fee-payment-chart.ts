import { Component, Input, OnDestroy } from '@angular/core';
import { FeePaymentReport } from '@app/domain/fees/fee-payment-report';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-fee-payment-chart',
  imports: [],
  templateUrl: './fee-payment-chart.html'
})
export class FeePaymentChartComponent implements OnDestroy {

  @Input() public set report(data: FeePaymentReport) {
    if (data) {
      this.loadChart(data);
    }
  }

  public chart: any;

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
