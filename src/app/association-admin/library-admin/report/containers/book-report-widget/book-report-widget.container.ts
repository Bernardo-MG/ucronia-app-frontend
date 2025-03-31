import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, JustifyCenterDirective } from '@bernardo-mg/layout';
import { BookReportService } from '../../services/book-report.service';

@Component({
  selector: 'assoc-book-report-widget',
  imports: [CommonModule, IconExcelComponent, CardComponent, CardBodyComponent, CardHeaderComponent, JustifyCenterDirective],
  templateUrl: './book-report-widget.container.html'
})
export class BookReportWidgetContainer {

  public waiting = false;

  private reportService = inject(BookReportService);

  public downloadExcel() {
    this.waiting = true;
    this.reportService.downloadExcelReport()
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
