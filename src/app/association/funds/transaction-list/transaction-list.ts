import { Component, input, output } from '@angular/core';
import { Transaction } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-transaction-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './transaction-list.html'
})
export class TransactionList {

  public readonly loading = input(false);
  public readonly data = input<Transaction[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly changePage = output<number>();
  public readonly show = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
