import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/layout';
import { BookReportService } from '../../services/book-report.service';

@Component({
  selector: 'assoc-book-report-widget',
  imports: [CommonModule, IconExcelComponent, CardComponent, CardBodyComponent, CardHeaderComponent, WaitingDirective, JustifyCenterDirective],
  templateUrl: './book-report-widget.container.html'
})
export class BookReportWidgetContainer {

  public waiting = false;

  private readonly service = inject(BookReportService);

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
