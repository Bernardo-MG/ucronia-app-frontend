
import { Component, inject } from '@angular/core';
import { TransactionBalanceService } from '@app/association-admin/funds/core/transaction-balance-service/transaction-balance-service';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';
import { CardModule } from 'primeng/card';
import { TransactionBalanceChart } from '../transaction-balance-chart/transaction-balance-chart';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';

@Component({
  selector: 'assoc-transaction-balance-chart-widget',
  imports: [CardModule, TransactionBalanceChart],
  templateUrl: './transaction-balance-chart-widget.html'
})
export class TransactionBalanceChartWidgetContainer {

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

  public get waiting() {
    return this.reading;
  }

  private reading = false;

  constructor() {
    // Read balance range
    this.loadInitialRange();
    this.setupBalanceReload();
  }

  private loadInitialRange() {
    this.reading = true;
    this.balanceService.monthly('', '')
      .pipe(finalize(() => this.reading = false))
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
          this.reading = true;
          return this.balanceService.monthly(start, end)
            .pipe(finalize(() => this.reading = false));
        })
      )
      .subscribe(data => this.balance = data);
  }

}
