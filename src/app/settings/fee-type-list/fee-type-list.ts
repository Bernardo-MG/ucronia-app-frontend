import { Component, input, output } from '@angular/core';
import { FeeType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-fee-type-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './fee-type-list.html'
})
export class FeeTypeList {

  public readonly data = input<FeeType[]>([]);
  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);

  public readonly changePage = output<number>();
  public readonly show = output<FeeType>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  // Event handlers
  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
