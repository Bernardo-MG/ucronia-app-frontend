
import { Component, inject } from '@angular/core';
import { TransactionBalanceService } from '@app/association-admin/funds/core/transaction-balance-service/transaction-balance-service';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';
import { CardModule } from 'primeng/card';
import { TransactionBalanceChart } from '../transaction-balance-chart/transaction-balance-chart';

@Component({
  selector: 'assoc-transaction-balance-chart-widget',
  imports: [CardModule, TransactionBalanceChart],
  templateUrl: './transaction-balance-chart-widget.html'
})
export class TransactionBalanceChartWidgetContainer {

  private readonly balanceService = inject(TransactionBalanceService);

  public balance: TransactionMonthlyBalance[] = [];

  public months: string[] = [];

  private _startMonth = '';

  public get startMonth() {
    return this._startMonth;
  }

  public set startMonth(month: string) {
    this._startMonth = month;
    this.loadBalance();
  }

  private _endMonth = '';

  public get endMonth() {
    return this._endMonth;
  }

  public set endMonth(month: string) {
    this._endMonth = month;
    this.loadBalance();
  }

  public get waiting() {
    return (this.readingBalance || this.readingRange);
  }

  private readingBalance = false;

  private readingRange = false;

  constructor() {
    // Read balance range
    this.readingRange = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.months = b.map(v => v.month);
      this.startMonth = this.months[0];
      this.endMonth = this.months[this.months.length - 1];
      this.readingRange = false;
      this.loadBalance();
    });
  }

  private loadBalance() {
    this.readingBalance = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
