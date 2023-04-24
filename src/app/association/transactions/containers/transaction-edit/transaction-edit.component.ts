import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { TransactionService } from '../../service/transaction.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-transaction-edit',
  templateUrl: './transaction-edit.component.html'
})
export class TransactionEditComponent implements OnInit {

  /**
   * Loading flag.
   */
  public saving = false;

  public transaction: Transaction = new Transaction();

  public fields: FormDescription[] = [
    { name: 'Description', property: 'description', type: 'string', validator: Validators.required },
    { name: 'Date', property: 'date', type: 'date', validator: Validators.required },
    { name: 'Amount', property: 'amount', type: 'string', validator: Validators.required }
  ];

  public failures: Failure[] = [];

  public formValid = false;

  constructor(
    private route: ActivatedRoute,
    private service: TransactionService
  ) { }

  ngOnInit(): void {
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
