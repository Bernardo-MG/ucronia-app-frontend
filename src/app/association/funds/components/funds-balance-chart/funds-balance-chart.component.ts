import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MonthlyBalance } from '@app/association/funds/models/monthly-balance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-funds-balance-chart',
  templateUrl: './funds-balance-chart.component.html'
})
export class FundsBalanceChartComponent implements OnChanges {

  @Input() public balance: MonthlyBalance[] = [];

  public chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balance']) {
      this.loadChart();
    }
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => {
      const substrings = b.date.match(/^[0-9]*-[0-9]*/);
      let date;
      if (substrings) {
        date = substrings[0];
      } else {
        date = b;
      }

      return date;
    })
    const cumulatives = this.balance.map(b => b.cumulative)
    const totals = this.balance.map(b => b.total)

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Balance',
          data: cumulatives,
          borderColor: 'rgba(200, 99, 132, .7)',
          borderWidth: 2,
        },
        {
          label: 'Month results',
          data: totals,
          borderColor: 'rgba(15, 10, 222, .7)',
          borderWidth: 2,
        },
      ],
    };
    this.chart = new Chart('balanceChart', {
      type: 'line',
      data,
      options: {
        responsive: true,
      }
    });
  }

}
