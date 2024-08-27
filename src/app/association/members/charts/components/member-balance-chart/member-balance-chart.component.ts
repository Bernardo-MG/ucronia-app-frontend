import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { MemberBalance } from '../../../models/member-balance';

@Component({
  selector: 'assoc-member-balance-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-balance-chart.component.html'
})
export class MemberBalanceChartComponent implements OnChanges {

  @Input() public waiting = false;

  @Input() public balance: MemberBalance[] = [];

  @Input() public startMonth = '';

  @Input() public endMonth = '';

  @Input() public months: string[] = [];

  @Output() public startMonthChange = new EventEmitter<string>();

  @Output() public endMonthChange = new EventEmitter<string>();

  public chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balance']) {
      this.loadChart();
    }
  }

  public onSelectStartMonth(event: any) {
    this.startMonthChange.emit(event.target.value);
  }

  public onSelectEndMonth(event: any) {
    this.endMonthChange.emit(event.target.value);
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.balance.map(b => b.date);
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

}
