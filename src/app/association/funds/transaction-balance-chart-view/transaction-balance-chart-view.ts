
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionMonthlyBalance } from "@ucronia/domain";
import Chart from 'chart.js/auto';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';

@Component({
  selector: 'assoc-transaction-balance-chart-view',
  imports: [FormsModule, SelectModule],
  templateUrl: './transaction-balance-chart-view.html'
})
export class TransactionBalanceChartview implements OnInit {

  private readonly balanceService = inject(TransactionBalanceService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);

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

  public ngOnInit(): void {
    // Read balance range
    this.transactionCalendarService.getRange()
      .pipe(finalize(() => this.setupBalanceReload()))
      .subscribe(months => {
        // To show in the selection box we have to reverse the order
        this.monthsSelection = months.reverse()
          .map(m => new Date(`${m.year}-${m.month}`))
          .map((m: Date) => ({
            value: m,
            label: m.toISOString().slice(0, 7),
          }));
        if (this.monthsSelection.length) {
          this.startMonth = this.monthsSelection[this.monthsSelection.length - 1].value;
          this.endMonth = this.monthsSelection[0].value;
        }
      });
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
