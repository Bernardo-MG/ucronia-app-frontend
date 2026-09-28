import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { StoredFile } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-file-list',
  imports: [ButtonModule, DatePipe, TableModule],
  templateUrl: './file-list.html'
})
export class FileList {
  public readonly loading = input(false);
  public readonly files = input<StoredFile[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  public readonly show = output<StoredFile>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent): void {
    this.changePage.emit((event.first / event.rows) + 1);
  }

  public formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
