import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { TransactionMonthlyBalance } from '@app/association-admin/funds/shared/models/transaction-monthly-balance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-transaction-balance-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-balance-chart.component.html'
})
export class TransactionBalanceChartComponent implements OnChanges, OnDestroy {

  @Input() public waiting = false;

  @Input() public balance: TransactionMonthlyBalance[] = [];

  @Input() public startMonth = '';

  @Input() public endMonth = '';

  @Input() public months: string[] = [];

  @Output() public startMonthChange = new EventEmitter<string>();

  @Output() public endMonthChange = new EventEmitter<string>();

  public chart: any;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['balance']) {
      this.loadChart();
    }
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public onSelectStartMonth(event: any) {
    this.startMonthChange.emit(event.target.value);
  }

  public onSelectEndMonth(event: any) {
    this.endMonthChange.emit(event.target.value);
  }

  public loadChart() {
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
