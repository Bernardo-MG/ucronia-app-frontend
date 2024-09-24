import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberBalance } from '@app/association-admin/members/shared/models/member-balance';
import { CardModule } from '@app/shared/card/card.module';
import { MemberBalanceService } from '../../services/member-balance.service';
import { MemberBalanceChartComponent } from '../member-balance-chart/member-balance-chart.component';

@Component({
  selector: 'assoc-member-balance-chart-widget',
  standalone: true,
  imports: [CommonModule, CardModule, MemberBalanceChartComponent],
  templateUrl: './member-balance-chart-widget.component.html'
})
export class MemberBalanceChartWidgetComponent implements OnInit {

  public balance: MemberBalance[] = [];

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

  public get waiting() {
    return (this.readingBalance || this.readingRange);
  }

  public set endMonth(month: string) {
    this._endMonth = month;
    this.loadBalance();
  }

  private readingBalance = false;

  private readingRange = false;

  constructor(
    private memberBalanceService: MemberBalanceService
  ) { }

  ngOnInit(): void {
    // Read balance range
    this.readingRange = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.months = b.map(v => v.date);
      this.startMonth = this.months[0];
      this.endMonth = this.months[this.months.length - 1];
      this.readingRange = false;
      this.loadBalance();
    });
  }

  private loadBalance() {
    this.readingBalance = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
    });
  }

}
