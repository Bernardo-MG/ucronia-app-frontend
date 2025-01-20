import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionMonthlyBalance } from '@app/models/transactions/transaction-monthly-balance';
import { CardModule } from '@app/shared/card/card.module';
import { TransactionBalanceService } from '../../../balance/services/transaction-balance.service';
import { TransactionBalanceChartComponent } from '../../components/transaction-balance-chart/transaction-balance-chart.component';

@Component({
    selector: 'assoc-transaction-balance-chart-widget',
    imports: [CommonModule, CardModule, TransactionBalanceChartComponent],
    templateUrl: './transaction-balance-chart-widget.container.html'
})
export class TransactionBalanceChartWidgetContainer implements OnInit {

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

  private loadBalance() {
    this.readingBalance = true;
    this.balanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
