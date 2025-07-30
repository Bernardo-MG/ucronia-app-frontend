
import { Component, inject } from '@angular/core';
import { IconExcelComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { BookReportService } from '../../services/book-report.service';

@Component({
  selector: 'assoc-book-report-widget',
  imports: [CardModule, IconExcelComponent, WaitingDirective, JustifyCenterDirective],
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
