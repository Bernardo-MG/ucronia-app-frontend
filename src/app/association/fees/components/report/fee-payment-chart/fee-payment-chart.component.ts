import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeePaymentReport } from '@app/association/fees/models/fee-payment-report';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-fee-payment-chart',
  standalone: true,
  imports: [],
  templateUrl: './fee-payment-chart.component.html'
})
export class FeePaymentChartComponent implements OnChanges {

  @Input() public report = new FeePaymentReport();

  public chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['report']) {
      this.loadChart();
    }
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = ['paid', 'unpaid'];
    const payments = [this.report.paid, this.report.unpaid];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Paid/unpaid',
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
