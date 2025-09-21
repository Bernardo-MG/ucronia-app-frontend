
import { Component, inject, OnDestroy } from '@angular/core';
import { TransactionBalanceService } from '@app/association-admin/funds/transaction-balance-service/transaction-balance-service';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';
import Chart from 'chart.js/auto';
import { CardModule } from 'primeng/card';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';

@Component({
  selector: 'assoc-transaction-balance-chart',
  imports: [CardModule],
  templateUrl: './transaction-balance-chart.html'
})
export class TransactionBalanceChartContainer implements OnDestroy {

  private readonly balanceService = inject(TransactionBalanceService);

  public balance: TransactionMonthlyBalance[] = [];

  public months: string[] = [];

  private startMonth$ = new BehaviorSubject<string>('');
  public get startMonth(): string {
    return this.startMonth$.value;
  }
  public set startMonth(month: string) {
    this.startMonth$.next(month);
  }

  private endMonth$ = new BehaviorSubject<string>('');
  public get endMonth(): string {
    return this.endMonth$.value;
  }
  public set endMonth(month: string) {
    this.endMonth$.next(month);
  }

  public loading = false;

  public chart: any;

  constructor() {
    // Read balance range
    this.loadInitialRange();
    this.setupBalanceReload();
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
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

    const labels = this.balance.map(b => b.month)
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

  private loadInitialRange() {
    this.loading = true;
    this.balanceService.monthly('', '')
      .pipe(finalize(() => this.loading = false))
      .subscribe(data => {
        if (!data.length) return;
        this.months = data.map(d => d.month);
        this.startMonth = this.months[0];
        this.endMonth = this.months[this.months.length - 1];
      });
  }

  private setupBalanceReload() {
    combineLatest([this.startMonth$, this.endMonth$])
      .pipe(
        switchMap(([start, end]) => {
          if (!start || !end) return [];
          this.loading = true;
          return this.balanceService.monthly(start, end)
            .pipe(finalize(() => this.loading = false));
        })
      )
      .subscribe(data => {
        this.balance = data;
        this.loadChart();
      });
  }

}
