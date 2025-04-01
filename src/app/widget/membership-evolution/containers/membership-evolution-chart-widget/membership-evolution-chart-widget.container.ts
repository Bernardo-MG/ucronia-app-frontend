import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MemberBalance } from '@app/models/members/member-balance';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { MembershipEvolutionChartComponent } from '../../components/membership-evolution-chart/membership-evolution-chart.component';
import { MembershipEvolutionService } from '../../services/membership-evolution.service';

@Component({
  selector: 'widget-membership-evolution-chart',
  imports: [CommonModule, MembershipEvolutionChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent],
  templateUrl: './membership-evolution-chart-widget.container.html'
})
export class MembershipEvolutionChartWidgetContainer implements OnInit {

  private memberBalanceService = inject(MembershipEvolutionService);

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

  public ngOnInit(): void {
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
