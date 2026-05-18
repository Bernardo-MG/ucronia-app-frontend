
import { Component, OnDestroy, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Month } from '@bernardo-mg/ui';
import { MembershipEvolutionMonth } from '@ucronia/domain';
import Chart from 'chart.js/auto';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';
import { MembershipEvolutionService } from '../membership-evolution-service';

@Component({
  selector: 'assoc-membership-evolution-chart-view',
  imports: [FormsModule, SelectModule],
  templateUrl: './membership-evolution-chart-view.component.html'
})
export class MembershipEvolutionChartView implements OnDestroy {

  private readonly service = inject(MembershipEvolutionService);

  public readonly startMonthChange = output<string>();
  public readonly endMonthChange = output<string>();

  public balance: MembershipEvolutionMonth[] = [];

  public months: { label: string, value: Month }[] = [];

  private startMonth$ = new BehaviorSubject<Month | undefined>(undefined);
  public get startMonth(): Month | undefined {
    return this.startMonth$.value;
  }
  public set startMonth(month: Month | undefined) {
    this.startMonth$.next(month);
  }

  private endMonth$ = new BehaviorSubject<Month | undefined>(undefined);
  public get endMonth(): Month | undefined {
    return this.endMonth$.value;
  }
  public set endMonth(month: Month | undefined) {
    this.endMonth$.next(month);
  }

  public get waiting() {
    return (this.readingBalance || this.readingRange);
  }

  private readingBalance = false;

  private readingRange = false;

  public chart: any;

  constructor() {
    // Read evolution range
    this.readingRange = true;
    this.service.monthly(this.startMonth, this.endMonth)
      .pipe(
        finalize(() => this.readingRange = false),
        finalize(() => this.setupBalanceReload())
      )
      .subscribe(months => {
        this.months = months.map(m => {
          return {
            label: `${m.month.getFullYear()}-${String(m.month.getMonth() + 1).padStart(2, '0')}`,
            value: new Month(m.month.getFullYear(), m.month.getMonth() + 1)
          };
        });
        // Range
        if (this.months.length) {
          this.startMonth = this.months[this.months.length - 1].value;
          this.endMonth = this.months[0].value;
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => b.month.toISOString().slice(0, 7));
    const totals = this.balance.map(b => b.total);

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

  private setupBalanceReload() {
    combineLatest([this.startMonth$, this.endMonth$])
      .pipe(
        switchMap(([start, end]) => {
          if (!start || !end) return [];
          this.readingBalance = true;
          return this.service.monthly(start, end)
            .pipe(finalize(() => this.readingBalance = false));
        })
      )
      .subscribe(data => {
        this.balance = data;
        this.loadChart();
      });
  }

}
