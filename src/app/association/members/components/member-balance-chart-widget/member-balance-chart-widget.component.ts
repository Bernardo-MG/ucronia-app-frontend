import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { MemberBalance } from '../../models/member-balance';
import { MemberBalanceService } from '../../services/member-balance.service';

@Component({
  selector: 'assoc-member-balance-chart-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-balance-chart-widget.component.html'
})
export class MemberBalanceChartWidgetComponent implements OnInit {

  public balance: MemberBalance[] = [];

  public months: string[] = [];

  public chart: any;

  public readingBalance = false;

  public readingRange = false;

  public startMonth: string | undefined;

  public endMonth: string | undefined;

  constructor(
    private memberBalanceService: MemberBalanceService
  ) { }

  ngOnInit(): void {
    // Read balance range
    this.readingRange = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.months = b.map(v => v.date);
      this.startMonth = this.months[0];
      this.endMonth = this.months[this.months.length - 1];
      this.readingRange = false;
      this.loadBalance();
    });
  }

  public onSelectStartMonth(event: any) {
    this.startMonth = event.target.value;
    this.loadBalance();
  }

  public onSelectEndMonth(event: any) {
    this.endMonth = event.target.value;
    this.loadBalance();
  }

  public get waiting() {
    return (this.readingBalance || this.readingRange);
  }

  private loadBalance() {
    this.readingBalance = true;
    this.memberBalanceService.monthly(this.startMonth, this.endMonth).subscribe(b => {
      this.balance = b;
      this.readingBalance = false;
      this.loadChart();
    });
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
          label: 'Members',
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
