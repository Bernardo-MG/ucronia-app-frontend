import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import Chart from 'chart.js/auto';

@Component({
    selector: 'assoc-fee-payment-chart',
    imports: [],
    templateUrl: './fee-payment-chart.component.html'
})
export class FeePaymentChartComponent implements OnChanges, OnDestroy {

  @Input() public report = new FeePaymentReport();

  public chart: any;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['report']) {
      this.loadChart();
    }
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = ['Pagado', 'No pagado'];
    const payments = [this.report.paid, this.report.unpaid];

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
