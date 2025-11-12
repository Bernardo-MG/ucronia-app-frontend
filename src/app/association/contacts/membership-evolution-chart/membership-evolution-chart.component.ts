
import { Component, OnDestroy, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberBalance } from '@app/domain/members/member-balance';
import Chart from 'chart.js/auto';
import { SelectModule } from 'primeng/select';
import { finalize } from 'rxjs';
import { MembershipEvolutionService } from '../membership-evolution-service';

@Component({
  selector: 'assoc-membership-evolution-chart',
  imports: [FormsModule, SelectModule],
  templateUrl: './membership-evolution-chart.component.html'
})
export class MembershipEvolutionChartComponent implements OnDestroy {

  private readonly service = inject(MembershipEvolutionService);

  public readonly startMonthChange = output<string>();
  public readonly endMonthChange = output<string>();

  public balance: MemberBalance[] = [];

  public months: Date[] = [];

  private _startMonth: Date | undefined = undefined;

  public get startMonth(): Date {
    return this._startMonth as Date;
  }

  public set startMonth(month: Date) {
    this._startMonth = month;
    this.loadBalance();
  }

  private _endMonth: Date | undefined = undefined;

  public get endMonth(): Date {
    return this._endMonth as Date;
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

  public chart: any;

  public monthsSelection: { label: string, value: Date }[] = [];

  constructor() {
    // Read balance range
    this.readingRange = true;
    this.service.monthly(this.startMonth, this.endMonth)
      .pipe(finalize(() => this.readingRange = false))
      .subscribe(b => {
        this.months = b.map(v => v.month);
        this.monthsSelection = this.months.map((m: Date) => ({
          value: m,
          label: m.toISOString().slice(0, 7),
        }));
        this.startMonth = this.months[0];
        this.endMonth = this.months[this.months.length - 1];
        this.loadBalance();
      });
  }

  private loadBalance() {
    this.readingBalance = true;
    this.service.monthly(this.startMonth, this.endMonth)
      .pipe(finalize(() => this.readingBalance = false))
      .subscribe(response => {
        this.balance = response;
        this.loadChart(response);
      });
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public onSelectStartMonth(event: any) {
    this.startMonthChange.emit(event.target.value);
  }

  public onSelectEndMonth(event: any) {
    this.endMonthChange.emit(event.target.value);
  }

  private loadChart(balance: MemberBalance[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = balance.map(b => b.month.toISOString().slice(0, 7));
    const totals = balance.map(b => b.total);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Socios',
          data: totals,
          borderColor: 'rgba(200, 99, 132, .7)',
          borderWidth: 2,
        },
      ],
    };
    this.chart = new Chart('memberBalanceChart', {
      type: 'line',
      data,
      options: {
        responsive: true,
      }
    });
  }

}
