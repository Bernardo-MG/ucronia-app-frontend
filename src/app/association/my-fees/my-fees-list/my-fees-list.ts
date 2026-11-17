import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MyFee } from '@ucronia/domain';
import { TagModule } from 'primeng/tag';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'app-my-fees-list',
  imports: [DatePipe, TableModule, TagModule],
  templateUrl: './my-fees-list.html'
})
export class MyFeesList {

  public readonly fees = input<MyFee[]>([]);
  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);

  public readonly changePage = output<number>();

  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  // Event handlers
  public onPageChange(event: TablePageEvent): void {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}