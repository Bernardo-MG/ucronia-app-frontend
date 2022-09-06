import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-transaction-create-view',
  templateUrl: './transaction-create-view.component.html',
  styleUrls: ['./transaction-create-view.component.sass']
})
export class TransactionCreateViewComponent {

  constructor(
    private service: TransactionService,
    private router: Router
    ) { }

  save(data: Transaction): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/transactions']);
    });
  }

}
