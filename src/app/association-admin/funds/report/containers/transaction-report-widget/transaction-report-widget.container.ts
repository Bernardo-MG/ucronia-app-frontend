import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { TransactionReportService } from '../../services/transaction-report.service';

@Component({
  selector: 'assoc-transaction-report-widget',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule, JustifyCenterDirective],
  templateUrl: './transaction-report-widget.container.html'
})
export class TransactionReportWidgetContainer {

  constructor(private reportService: TransactionReportService) { }

  public downloadExcel() {
    this.reportService.downloadExcelReport().subscribe();
  }

}
