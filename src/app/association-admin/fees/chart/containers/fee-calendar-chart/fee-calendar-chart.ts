
import { Component, input, OnChanges, OnDestroy, output, SimpleChanges } from '@angular/core';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import Chart, { ActiveElement, ChartEvent } from 'chart.js/auto';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { FeeCalendarSelection } from '../../model/fee-calendar-selection';

@Component({
  selector: 'assoc-fee-calendar-chart',
  imports: [],
  templateUrl: './fee-calendar-chart.html'
})
export class FeeCalendarChart implements OnChanges, OnDestroy {

  public readonly feeCalendar = input<FeeCalendarYear[]>([]);

  public readonly selectMonth = output<FeeCalendarSelection>();

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

    const payments = calendar.flatMap((c, yIndex) =>
      months.map((monthName, xIndex) => {
        const m = c.months.find(mo => {
          const monthIndex = parseInt(mo.month.split('-')[1], 10) - 1;
          return monthIndex === xIndex;
        });
        let selection;
        if (m) {
          selection = { number: c.member.number, name: c.member.name, month: m?.month, paid: m?.paid } as FeeCalendarSelection;
        } else {
          selection = undefined;
        }

        return {
          x: xIndex,
          y: yIndex,
          v: selection
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
            data: payments,
            backgroundColor: (ctx: any) => {
              if (ctx?.raw?.v == null) {
                return 'transparent';
              } else {
                return ctx?.raw?.v.paid ? 'green' : 'red';
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
            enabled: false
          },
        },
        scales: {
          x: {
            type: 'linear',
            ticks: {
              stepSize: 1,
              autoSkip: false
            },
            title: { display: true, text: 'Cuotas' },
          },
          y: {
            type: 'linear',
            ticks: {
              stepSize: 1,
              autoSkip: false,   
              callback: (val) => members[val as number],
            },
            title: { display: true, text: 'Socios' },
          },
        },
        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
          const canvas = event.native?.target as HTMLCanvasElement;
          if (!canvas) return;

          if (elements.length) {
            canvas.style.cursor = 'pointer';
          } else {
            canvas.style.cursor = 'default';
          }
        },
        onClick: (event: ChartEvent, elements: ActiveElement[]) => {
          const points = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

          if (points.length) {
            const firstPoint = points[0];
            const datasetIndex = firstPoint.datasetIndex;
            const index = firstPoint.index;
            const pointData = this.chart.data.datasets[datasetIndex].data[index];

            this.selectMonth.emit(pointData.v);
          }
        }
      }
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

}
