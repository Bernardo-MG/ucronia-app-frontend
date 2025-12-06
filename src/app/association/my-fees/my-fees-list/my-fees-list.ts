import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Fee } from '@app/domain/fees/fee';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'app-my-fees-list',
  imports: [CommonModule, TableModule],
  templateUrl: './my-fees-list.html'
})
export class MyFeesList {

  public readonly fees = input<Fee[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  public readonly loading = input(false);
  
  public readonly pageChange = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.rows()) + 1;
    this.pageChange.emit(page);
  }

}
