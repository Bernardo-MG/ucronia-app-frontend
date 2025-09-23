
import { Component, inject } from '@angular/core';
import { MemberBalance } from '@app/domain/members/member-balance';
import { CardModule } from 'primeng/card';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';
import { MembershipEvolutionService } from '../membership-evolution-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'widget-membership-evolution-chart',
  imports: [CardModule, MembershipEvolutionChartComponent],
  templateUrl: './membership-evolution-chart-widget.container.html'
})
export class MembershipEvolutionChartWidgetContainer {

  private readonly service = inject(MembershipEvolutionService);

  public balance: MemberBalance[] = [];

  public months: Date[] = [];

  private _startMonth = new Date();

  public get startMonth(): Date {
    return this._startMonth;
  }

  public set startMonth(month: Date) {
    this._startMonth = month;
    this.loadBalance();
  }

  private _endMonth = new Date();

  public get endMonth(): Date {
    return this._endMonth;
  }

  public set endMonth(month: Date) {
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
    this.service.monthly(this.startMonth, this.endMonth)
      .pipe(finalize(() => this.readingRange = false))
      .subscribe(b => {
        this.months = b.map(v => v.month);
        this.startMonth = this.months[0];
        this.endMonth = this.months[this.months.length - 1];
        this.loadBalance();
      });
  }

  private loadBalance() {
    this.readingBalance = true;
    this.service.monthly(this.startMonth, this.endMonth)
      .pipe(finalize(() => this.readingBalance = false))
      .subscribe(response => this.balance = response);
  }

}
