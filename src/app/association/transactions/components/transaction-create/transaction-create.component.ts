import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
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

  public valid = false;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: TransactionService,
    private router: Router
  ) { }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/transactions/${d.id}`]);
        this.failures = {};
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
