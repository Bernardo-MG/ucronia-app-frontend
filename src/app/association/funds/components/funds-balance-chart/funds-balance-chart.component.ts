import { Component, OnInit } from '@angular/core';
import { MonthlyBalance } from '@app/association/models/monthly-balance';
import Chart from 'chart.js/auto';
import { BalanceService } from '../../service/balance.service';

@Component({
  selector: 'assoc-funds-balance-chart',
  templateUrl: './funds-balance-chart.component.html'
})
export class FundsBalanceChartComponent implements OnInit {

  public chart: any;

  private data: MonthlyBalance[] = [];

  constructor(
    private balanceService: BalanceService
  ) { }

  ngOnInit(): void {
    this.balanceService.monthly().subscribe(b => {
      this.data = b;
      this.createChart();
    });
  }

  createChart() {
    const labels = this.data.map(b => b.date)
    const cumulatives = this.data.map(b => b.cumulative)
    const totals = this.data.map(b => b.total)
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
