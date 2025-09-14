
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, input, output } from '@angular/core';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-transaction-balance-chart',
  imports: [],
  templateUrl: './transaction-balance-chart.html'
})
export class TransactionBalanceChart implements OnChanges, OnDestroy {

  public readonly waiting = input(false);

  public readonly balance = input<TransactionMonthlyBalance[]>([]);

  public readonly startMonth = input('');

  public readonly endMonth = input('');

  @Input() public months: string[] = [];

  public readonly startMonthChange = output<string>();

  public readonly endMonthChange = output<string>();

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

    const labels = this.balance().map(b => b.month)
    const totals = this.balance().map(b => b.total)
    const results = this.balance().map(b => b.results)

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
