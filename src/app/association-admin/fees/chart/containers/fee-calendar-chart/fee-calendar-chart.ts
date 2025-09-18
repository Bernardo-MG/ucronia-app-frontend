
import { Component, input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import Chart from 'chart.js/auto';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

@Component({
  selector: 'assoc-fee-calendar-chart',
  imports: [],
  templateUrl: './fee-calendar-chart.html'
})
export class FeeCalendarChart implements OnChanges, OnDestroy {

  public feeCalendar = input<FeeCalendarYear[]>([]);

  public chart: any;

  constructor() {
    Chart.register(MatrixController, MatrixElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['feeCalendar']) {
      this.loadChart(this.feeCalendar());
    }
  }

  public ngOnDestroy(): void {
    this.destroyChart();
  }

  private loadChart(calendar: FeeCalendarYear[]): void {
    this.destroyChart();

    // Build axis categories
    const members = calendar.map(c => c.member.name.fullName);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = calendar.flatMap((c, yIndex) =>
      // Map over that member’s months only
      c.months.map(mo => {
        const monthIndex = parseInt(mo.month.split('-')[1], 10) - 1;
        return {
          x: monthIndex,
          y: yIndex,
          v: mo.paid,
        };
      })
    );

    const ctx = document.getElementById('feeCalendarChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [
          {
            label: 'Pagos',
            data,
            backgroundColor: (ctx: any) => {
              return ctx?.raw?.v ? '#28a745' : '#dc3545';
            }
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) =>
                `${members[context.raw.y]} - ${months[context.raw.x]}: ${context.raw.v ? 'Pagado' : 'No pagado'
                }`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback: (val) => months[val as number],
            },
            title: { display: true, text: 'Cuotas' },
          },
          y: {
            ticks: {
              callback: (val) => members[val as number],
            },
            title: { display: true, text: 'Socios' },
          },
        },
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

}
