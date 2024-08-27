import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionMonthlyBalance } from '@app/association/funds/shared/models/transaction-monthly-balance';
import { TransactionBalanceService } from '../../../core/service/transaction-balance.service';
import { TransactionBalanceChartComponent } from '../transaction-balance-chart/transaction-balance-chart.component';

@Component({
  selector: 'assoc-transaction-balance-chart-widget',
  standalone: true,
  imports: [CommonModule, TransactionBalanceChartComponent],
  templateUrl: './transaction-balance-chart-widget.component.html'
})
export class TransactionBalanceChartWidgetComponent implements OnInit {

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
