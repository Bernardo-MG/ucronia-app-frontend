import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionMonthlyBalance } from '@app/association/transactions/models/transaction-monthly-balance';
import Chart from 'chart.js/auto';
import { TransactionBalanceService } from '../../service/transaction-balance.service';

@Component({
  selector: 'assoc-transaction-balance-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-balance-chart.component.html'
})
export class TransactionBalanceChartComponent implements OnInit {

  public balance: TransactionMonthlyBalance[] = [];

  public months: string[] = [];

  public chart: any;

  public readingBalance = false;

  public readingRange = false;

  public startMonth: string | undefined;

  public endMonth: string | undefined;

  constructor(
    private balanceService: TransactionBalanceService
  ) { }

  ngOnInit(): void {
    // Read balance range
    this.readingRange = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.months = b.map(v => v.date);
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

  public get waiting() {
    return (this.readingBalance || this.readingRange);
  }

  private loadBalance() {
    this.readingBalance = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
      this.loadChart();
    });
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => b.date)
    const totals = this.balance.map(b => b.total)
    const results = this.balance.map(b => b.results)

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Balance',
          data: totals,
          borderColor: 'rgba(200, 99, 132, .7)',
          borderWidth: 2,
        },
        {
          label: 'Month results',
          data: results,
          borderColor: 'rgba(15, 10, 222, .7)',
          borderWidth: 2,
        }
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
