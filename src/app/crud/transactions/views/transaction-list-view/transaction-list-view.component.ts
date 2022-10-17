import { Component, OnInit } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.sass']
})
export class TransactionListViewComponent implements OnInit {

  public transactions: Transaction[] = [];

  public pageInfo = new PageInfo();

  constructor(
    private service: TransactionService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(page => {
      this.transactions = page.content;
      this.pageInfo = page;
    });
  }

}
