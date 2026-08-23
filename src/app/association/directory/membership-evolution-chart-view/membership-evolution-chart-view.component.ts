
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Month } from '@bernardo-mg/ui';
import { MembershipEvolutionMonth } from '@ucronia/domain';
import Chart from 'chart.js/auto';
import { Select } from 'primeng/select';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { MembershipEvolutionService } from '../membership-evolution-service';

@Component({
  selector: 'assoc-membership-evolution-chart-view',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './membership-evolution-chart-view.component.html'
})
export class MembershipEvolutionChartView implements OnInit, OnDestroy {

  private readonly service = inject(MembershipEvolutionService);

  public readonly startMonthChange = output<string>();
  public readonly endMonthChange = output<string>();

  public balance: MembershipEvolutionMonth[] = [];

  public readonly ranges = [
    { label: '3 meses', value: 3 },
    { label: '6 meses', value: 6 },
    { label: '1 año', value: 12 },
    { label: '2 años', value: 24 }
  ];

  private readonly selectedRange$ = new BehaviorSubject<number>(12);

  public get selectedRange(): number {
    return this.selectedRange$.value;
  }
  public set selectedRange(value: number) {
    this.selectedRange$.next(value);
  }

  public loading = false;

  public chart: any;

  public ngOnInit(): void {
    this.setupBalanceReload();
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

    const labels = this.balance.map(() => '');
    const totals = this.balance.map(b => b.total);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Socios',
          data: totals,
          borderColor: '#4338ca',
          backgroundColor: 'rgba(79, 70, 229, 0.08)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5
        },
      ],
    };
    this.chart = new Chart('memberBalanceChart', {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            display: false,
            grid: { display: false }
          },
          y: {
            grid: { color: '#e5e7eb' }
          }
        }
      }
    });
  }

  private setupBalanceReload() {
    this.selectedRange$
      .pipe(
        switchMap(range => {
          const now = new Date();
          const end = new Month(now.getFullYear(), now.getMonth() + 1);
          const startDate = new Date(now);
          startDate.setMonth(startDate.getMonth() - range);
          const start = new Month(startDate.getFullYear(), startDate.getMonth() + 1);

          this.loading = true;

          return this.service.monthly(start, end)
            .pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe(data => {
        this.balance = data;
        this.loadChart();
      });
  }

}
