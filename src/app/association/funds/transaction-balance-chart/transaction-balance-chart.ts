
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';
import Chart from 'chart.js/auto';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';

@Component({
  selector: 'assoc-transaction-balance-chart',
  imports: [FormsModule, SelectModule],
  templateUrl: './transaction-balance-chart.html'
})
export class TransactionBalanceChart {

  private readonly balanceService = inject(TransactionBalanceService);

  public balance: TransactionMonthlyBalance[] = [];

  public months: Date[] = [];

  private startMonth$ = new BehaviorSubject<Date>(new Date());
  public get startMonth(): Date {
    return this.startMonth$.value;
  }
  public set startMonth(month: Date) {
    this.startMonth$.next(month);
  }

  private endMonth$ = new BehaviorSubject<Date>(new Date());
  public get endMonth(): Date {
    return this.endMonth$.value;
  }
  public set endMonth(month: Date) {
    this.endMonth$.next(month);
  }

  public loading = false;

  public chart: any;

  public monthsSelection: { label: string, value: Date }[] = [];

  constructor() {
    // Read balance range
    this.loadInitialRange();
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

    const labels = this.balance.map(b => b.month.toISOString().slice(0, 7))
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
    this.balanceService.monthly(undefined, undefined)
      .pipe(finalize(() => this.loading = false))
      .pipe(finalize(() => this.setupBalanceReload()))
      .subscribe(data => {
        if (!data.length) return;
        this.months = data.map(d => d.month);
        this.monthsSelection = this.months.map((m: Date) => ({
          value: m,
          label: m.toISOString().slice(0, 7),
        }));
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
