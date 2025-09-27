
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberBalance } from '@app/domain/members/member-balance';
import Chart from 'chart.js/auto';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-membership-evolution-chart',
  imports: [FormsModule, SelectModule],
  templateUrl: './membership-evolution-chart.component.html'
})
export class MembershipEvolutionChartComponent implements OnDestroy, OnChanges {

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

  public monthsSelection: { label: string, value: Date }[] = [];

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public ngOnChanges({ months }: SimpleChanges): void {
    if (months) {
      this.monthsSelection = months.currentValue.map((m: string) => ({
        value: m,
        label: m,
      }));
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
