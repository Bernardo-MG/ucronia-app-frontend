import { Component, OnInit } from '@angular/core';
import { FeePaymentReport } from '@app/association/fees/models/fee-payment-report';
import { FeeReportService } from '@app/association/fees/services/fee-report.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'assoc-fee-payment-chart-widget',
  standalone: true,
  imports: [],
  templateUrl: './fee-payment-chart-widget.component.html'
})
export class FeePaymentChartWidgetComponent implements OnInit {

  private data = new FeePaymentReport();

  public chart: any;

  constructor(
    private feeReportService: FeeReportService
  ) { }

  ngOnInit(): void {
    this.feeReportService.getPaymentReport().subscribe({
      next: response => {
        this.data = response;
        this.loadChart();
      },
      error: error => {
      }
    });
  }

  private loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = ['paid', 'unpaid'];
    const payments = [this.data.paid, this.data.unpaid];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Paid/unpaid',
          data: payments,
          backgroundColor: ["#51EAEA", "#FCDDB0"]
        },
      ],
    };
    this.chart = new Chart('feePaymentChart', {
      type: 'pie',
      data
    });
  }

}
