
import { Component, Input, OnDestroy, input, output } from '@angular/core';
import { MemberBalance } from '@app/domain/members/member-balance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-membership-evolution-chart',
  imports: [],
  templateUrl: './membership-evolution-chart.component.html'
})
export class MembershipEvolutionChartComponent implements OnDestroy {

  public readonly waiting = input(false);

  @Input() public set balance(data: MemberBalance[]) {
    this.loadChart(data);
  }

  public readonly startMonth = input(new Date());

  public readonly endMonth = input(new Date());

  public readonly months = input<Date[]>([]);

  public readonly startMonthChange = output<string>();

  public readonly endMonthChange = output<string>();

  public chart: any;

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

    const labels = balance.map(b => b.month);
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
