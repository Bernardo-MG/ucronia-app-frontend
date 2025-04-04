import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { MemberBalance } from '@app/models/members/member-balance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-membership-evolution-chart',
  imports: [CommonModule],
  templateUrl: './membership-evolution-chart.component.html'
})
export class MembershipEvolutionChartComponent implements OnDestroy {

  @Input() public waiting = false;

  @Input() public set balance(data: MemberBalance[]) {
    this.loadChart(data);
  }

  @Input() public startMonth = '';

  @Input() public endMonth = '';

  @Input() public months: string[] = [];

  @Output() public startMonthChange = new EventEmitter<string>();

  @Output() public endMonthChange = new EventEmitter<string>();

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

    const labels = balance.map(b => b.date);
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
