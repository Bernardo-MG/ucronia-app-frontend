import { Component, OnInit } from '@angular/core';
import { MonthlyBalance } from '@app/association/funds/models/monthly-balance';
import { Chart } from 'chart.js';
import { MemberBalanceService } from '../../services/member-balance.service';

@Component({
  selector: 'assoc-member-balance-chart',
  templateUrl: './member-balance-chart.component.html'
})
export class MemberBalanceChartComponent implements OnInit {

  public balance: MonthlyBalance[] = [];

  public months: string[] = [];

  public chart: any;

  public readingBalance = false;

  public readingRange = false;

  public startMonth: string | undefined;

  public endMonth: string | undefined;

  constructor(
    private memberBalanceService: MemberBalanceService
  ) { }

  ngOnInit(): void {
    // Read balance range
    this.readingRange = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.months = b.map(v => this.removeDay(v.month));
      this.startMonth = this.months[0];
      this.endMonth = this.months[this.months.length - 1];
      this.readingRange = false;
      this.loadBalance();
    });
  }

  public onSelectStartMonth(event: any) {
    this.startMonth = event.target.value;
    this.loadBalance();
  }

  public onSelectEndMonth(event: any) {
    this.endMonth = event.target.value;
    this.loadBalance();
  }

  public isWaiting() {
    return (this.readingBalance || this.readingRange);
  }

  private loadBalance() {
    this.readingBalance = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
      this.loadChart();
    });
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => this.removeDay(b.month))
    const totals = this.balance.map(b => b.total)
    const differences = this.balance.map(b => b.difference)

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Balance',
          data: totals,
          borderColor: 'rgba(200, 99, 132, .7)',
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
