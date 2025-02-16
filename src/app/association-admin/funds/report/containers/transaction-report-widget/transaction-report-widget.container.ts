import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, JustifyCenterDirective } from '@bernardo-mg/layout';
import { TransactionReportService } from '../../services/transaction-report.service';

@Component({
    selector: 'assoc-transaction-report-widget',
    imports: [CommonModule, IconExcelComponent, CardComponent, CardBodyComponent, CardHeaderComponent, JustifyCenterDirective],
    templateUrl: './transaction-report-widget.container.html'
})
export class TransactionReportWidgetContainer {

  constructor(private reportService: TransactionReportService) { }

  public downloadExcel() {
    this.reportService.downloadExcelReport().subscribe();
  }

}
