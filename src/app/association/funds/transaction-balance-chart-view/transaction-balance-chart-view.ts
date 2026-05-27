import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Month } from '@bernardo-mg/ui';
import { TransactionMonthlyBalance } from '@ucronia/domain';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';

@Component({
  selector: 'assoc-transaction-balance-chart-view',
  imports: [FormsModule, SelectModule],
  templateUrl: './transaction-balance-chart-view.html'
})
export class TransactionBalanceChartView implements OnInit, OnDestroy {

  private readonly service = inject(TransactionBalanceService);

  public balance: TransactionMonthlyBalance[] = [];

  public readonly ranges = [
    { label: '3 meses', value: 3 },
    { label: '6 meses', value: 6 },
    { label: '1 año', value: 12 },
    { label: '2 años', value: 24 }
  ];

  private readonly selectedRange$ = new BehaviorSubject<number>(3);

  public get selectedRange(): number {
    return this.selectedRange$.value;
  }
  public set selectedRange(value: number) {
    this.selectedRange$.next(value);
  }

  public loading = false;

  public chart: any;

  public ngOnInit(): void {
    this.setupBalanceReload();
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

    const labels = this.balance.map(b => format(b.month, 'yyyy-MM'))
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

  private setupBalanceReload() {
    this.selectedRange$
      .pipe(
        switchMap(range => {
          const now = new Date();
          const end = new Month(now.getFullYear(), now.getMonth() + 1);
          const startDate = new Date(now);
          startDate.setMonth(startDate.getMonth() - range);
          const start = new Month(startDate.getFullYear(), startDate.getMonth() + 1);

          this.loading = true;

          return this.service.monthly(start, end)
            .pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe(data => {
        this.balance = data;
        this.loadChart();
      });
  }

}
