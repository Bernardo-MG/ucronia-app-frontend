import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/ui';
import { TransactionReportService } from '../../services/transaction-report.service';

@Component({
  selector: 'assoc-transaction-report-widget',
  imports: [CommonModule, IconExcelComponent, CardComponent, CardBodyComponent, CardHeaderComponent, WaitingDirective, JustifyCenterDirective],
  templateUrl: './transaction-report-widget.container.html'
})
export class TransactionReportWidgetContainer {

  public waiting = false;

  private readonly service = inject(TransactionReportService);

  public downloadExcel() {
    this.waiting = true;
    this.service.downloadExcelReport()
      .subscribe({
        next: response => {
          this.waiting = false;
        },
        error: error => {
          this.waiting = false;
        }
      });
  }

}
