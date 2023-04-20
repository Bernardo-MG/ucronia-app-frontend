import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-create',
  templateUrl: './transaction-create.component.html'
})
export class TransactionCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    { name: 'Description', property: 'description', type: 'string', validator: Validators.required },
    { name: 'Date', property: 'date', type: 'date', validator: Validators.required },
    { name: 'Amount', property: 'amount', type: 'string', validator: Validators.required }
  ];

  constructor(
    private service: TransactionService,
    private router: Router
  ) { }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/transactions/${d.id}`]);
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
