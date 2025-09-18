
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
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const data = calendar.flatMap((c, yIndex) =>
      months.map((monthName, xIndex) => {
        const m = c.months.find(mo => {
          const monthIndex = parseInt(mo.month.split('-')[1], 10) - 1;
          return monthIndex === xIndex;
        });

        return {
          x: xIndex,
          y: yIndex,
          v: m ? (m.paid ? 1 : 0) : null
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
              if (ctx?.raw?.v == null) {
                return 'transparent';
              } else {
                return ctx?.raw?.v ? 'green' : 'red';
              }
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
