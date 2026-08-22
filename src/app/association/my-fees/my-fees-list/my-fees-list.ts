import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Fee } from '@ucronia/domain';
import { TagModule } from 'primeng/tag';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'app-my-fees-list',
  imports: [CurrencyPipe, DatePipe, TableModule, TagModule],
  templateUrl: './my-fees-list.html'
})
export class MyFeesList {

  public readonly fees = input<Fee[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  public readonly loading = input(false);

  public readonly changePage = output<number>();

  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent): void {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}