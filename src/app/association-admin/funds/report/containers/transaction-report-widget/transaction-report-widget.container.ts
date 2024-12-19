import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { TransactionReportService } from '../../service/transaction-report.service';

@Component({
  selector: 'assoc-transaction-report-widget',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule],
  templateUrl: './transaction-report-widget.container.html'
})
export class TransactionReportWidgetContainer {

  constructor(private transactionService: TransactionReportService) { }

  download() {
    this.transactionService.downloadExcelReport().subscribe();
  }

}
