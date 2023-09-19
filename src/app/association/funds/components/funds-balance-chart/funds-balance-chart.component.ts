import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MonthlyBalance } from '@app/association/funds/models/monthly-balance';
import Chart from 'chart.js/auto';
import { BalanceService } from '../../service/balance.service';

@Component({
  selector: 'assoc-funds-balance-chart',
  templateUrl: './funds-balance-chart.component.html'
})
export class FundsBalanceChartComponent implements OnChanges, OnInit {

  public balance: MonthlyBalance[] = [];

  public months: string[] = [];

  public chart: any;

  public readingBalance = false;

  public startMonth: string | undefined;

  public endMonth: string | undefined;

  constructor(
    private balanceService: BalanceService
  ) { }

  ngOnInit(): void {
    // Read balance
    this.readingBalance = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.months = this.balance.map(b => this.removeDay(b.month));
      this.startMonth = this.months[0];
      this.endMonth = this.months[this.months.length - 1];
      this.readingBalance = false;
      this.loadChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balance']) {
      this.loadChart();
    }
  }

  public onSelectStartMonth(event: any) {
    this.startMonth = event.target.value;
  }

  public onSelectEndMonth(event: any) {
    this.endMonth = event.target.value;
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => this.removeDay(b.month))
    const cumulatives = this.balance.map(b => b.cumulative)
    const totals = this.balance.map(b => b.monthlyTotal)

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

  private removeDay(date: string) {
    const substrings = date.match(/^[0-9]*-[0-9]*/);
    let month;
    if (substrings) {
      month = substrings[0];
    } else {
      month = date;
    }

    return month;
  }

}
