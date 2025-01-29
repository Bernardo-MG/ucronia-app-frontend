import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { IconExcelComponent } from 'icons';
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
