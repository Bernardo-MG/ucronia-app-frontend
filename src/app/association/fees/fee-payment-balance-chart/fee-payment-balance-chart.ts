
import { Component, input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FeePaymentReport } from "@ucronia/domain";
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-fee-payment-balance-chart',
  imports: [],
  templateUrl: './fee-payment-balance-chart.html'
})
export class FeePaymentBalanceChart implements OnChanges, OnDestroy {

  public readonly report = input(new FeePaymentReport());

  public chart: any;

  public ngOnChanges({ report }: SimpleChanges): void {
    if (report) {
      this.loadChart(report.currentValue);
    }
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
