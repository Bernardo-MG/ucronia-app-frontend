import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-funds-create',
  templateUrl: './funds-create.component.html'
})
export class FundsCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: TransactionService,
    private router: Router
  ) { }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/funds/${d.id}`]);
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

}
