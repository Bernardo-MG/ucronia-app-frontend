import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '@app/transactions/service/transaction.service';

@Component({
  selector: 'transaction-create-view',
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
