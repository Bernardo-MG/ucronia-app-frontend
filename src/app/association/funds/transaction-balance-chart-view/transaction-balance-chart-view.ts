import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Month } from '@bernardo-mg/ui';
import { TransactionMonthlyBalance } from '@ucronia/domain';
import Chart from 'chart.js/auto';
import { Select } from 'primeng/select';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { TransactionBalanceService } from '../transaction-balance-service';

@Component({
  selector: 'assoc-transaction-balance-chart-view',
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './transaction-balance-chart-view.html'
})
export class TransactionBalanceChartView implements OnInit, OnDestroy {

  private readonly service = inject(TransactionBalanceService);
  private readonly selectedRange$ = new BehaviorSubject<number>(6);

  public readonly ranges = [
    { label: '3 meses', value: 3 },
    { label: '6 meses', value: 6 },
    { label: '1 año', value: 12 },
    { label: '2 años', value: 24 }
  ];

  public balance: TransactionMonthlyBalance[] = [];
  public loading = false;

  private chart?: Chart;

  public get selectedRange(): number {
    return this.selectedRange$.value;
  }

  public set selectedRange(value: number) {
    this.selectedRange$.next(value);
  }

  public ngOnInit(): void {
    this.setupBalanceReload();
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private loadChart(): void {
    this.chart?.destroy();

    const labels = this.balance.map(() => '');
    const totals = this.balance.map(balance => balance.total);
    const results = this.balance.map(balance => balance.results);

    this.chart = new Chart('balanceChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Saldo',
            data: totals,
            borderColor: '#4338ca',
            backgroundColor: 'rgba(79, 70, 229, 0.10)',
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5
          },
          {
            label: 'Resultado',
            data: results,
            borderColor: '#16a34a',
            backgroundColor: '#16a34a',
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 24
            }
          }
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e5e7eb'
            }
          }
        }
      }
    });
  }

  private setupBalanceReload(): void {
    this.selectedRange$
      .pipe(
        switchMap(range => {
          const now = new Date();
          const end = new Month(
            now.getFullYear(),
            now.getMonth() + 1
          );

          const startDate = new Date(now);
          startDate.setMonth(startDate.getMonth() - range);

          const start = new Month(
            startDate.getFullYear(),
            startDate.getMonth() + 1
          );

          this.loading = true;

          return this.service
            .monthly(start, end)
            .pipe(
              finalize(() => this.loading = false)
            );
        })
      )
      .subscribe(balance => {
        this.balance = balance;
        this.loadChart();
      });
  }
}