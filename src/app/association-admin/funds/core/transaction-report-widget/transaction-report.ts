
import { Component, inject } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { TransactionReportService } from '../transaction-report-service/transaction-report-service';

@Component({
  selector: 'assoc-transaction-report',
  imports: [CardModule, IconExcelComponent, WaitingDirective, JustifyCenterDirective],
  templateUrl: './transaction-report.html'
})
export class TransactionReport {

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
