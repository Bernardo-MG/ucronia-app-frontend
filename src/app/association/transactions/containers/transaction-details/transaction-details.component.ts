import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-details',
  templateUrl: './transaction-details.component.html'
})
export class TransactionDetailsComponent implements OnInit {

  /**
   * Loading flag.
   */
  public saving = false;

  public editable = false;

  public deletable = false;

  public transaction: Transaction = new Transaction();

  public failures: Failure[] = [];

  public formValid = false;

  public fields: FormDescription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authService: AuthService
  ) {
    this.fields = service.getFields();
  }

  ngOnInit(): void {
    this.editable = this.authService.hasPermission("transaction", "update");
    this.deletable = this.authService.hasPermission("transaction", "delete");

    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.update(this.transaction.id, data).subscribe({
      next: d => {
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

  public onDelete(data: Transaction): void {
    this.service.delete(data.id).subscribe(r => {
      this.router.navigate([`/transactions/list`]);
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.transaction = d;
        });
    }
  }

}
