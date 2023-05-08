import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
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

  public failures: Failure[] = [];

  public fields: FormDescription[];

  constructor(
    private service: TransactionService,
    private router: Router
  ) {
    this.fields = service.getFields();
  }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/transactions/${d.id}`]);
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
