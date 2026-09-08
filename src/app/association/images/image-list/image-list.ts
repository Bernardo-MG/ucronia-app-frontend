import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Image } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-image-list',
  imports: [ButtonModule, DatePipe, TableModule],
  templateUrl: './image-list.html'
})
export class ImageList {
  public readonly loading = input(false);
  public readonly images = input<Image[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  public readonly contentUrl = input.required<(number: number) => string>();

  public readonly show = output<Image>();
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
