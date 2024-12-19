import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BookReportService } from '../../services/book-report.service';

@Component({
  selector: 'assoc-book-report-widget',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule],
  templateUrl: './book-report-widget.component.html'
})
export class BookReportWidgetComponent {

  constructor(private reportService: BookReportService) { }

  download() {
    this.reportService.downloadExcelReport().subscribe();
  }

}
