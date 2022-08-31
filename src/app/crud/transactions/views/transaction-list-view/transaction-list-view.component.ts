import { Component, OnInit } from '@angular/core';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';

@Component({
  selector: 'app-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.sass']
})
export class TransactionListViewComponent {

  public transactions: Transaction[] = [];

  constructor(
    private service: TransactionService
  ) {
    this.service.getAll().subscribe(d => this.transactions = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.transactions = d);
    });
  }

}
