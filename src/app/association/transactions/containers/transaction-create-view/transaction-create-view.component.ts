import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'admin-transaction-create-view',
  templateUrl: './transaction-create-view.component.html',
  styleUrls: ['./transaction-create-view.component.sass']
})
export class TransactionCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public transaction = new Transaction();

  public formValid = false;

  constructor(
    private service: TransactionService,
    private router: Router
  ) { }

  public onSave(): void {
    this.waiting = true;
    this.service.create(this.transaction).subscribe({
      next: d => {
        this.router.navigate([`/transactions/${d.id}`]);
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Transaction) {
    this.transaction = value;
  }

}
