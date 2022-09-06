import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.sass']
})
export class TransactionListViewComponent implements OnInit {

  public transactions: Transaction[] = [];

  constructor(
    private service: TransactionService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(d => this.transactions = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.transactions = d);
    });
  }

}
