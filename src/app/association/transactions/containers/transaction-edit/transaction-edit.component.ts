import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { TransactionService } from '../../service/transaction.service';
import { Validators } from '@angular/forms';
import { FormDescription } from '@app/shared/layout/models/form-description';

@Component({
  selector: 'assoc-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.sass']
})
export class TransactionEditComponent implements OnInit {

  /**
   * Loading flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    { name: 'Description', property: 'description', type: 'string', validator: Validators.required },
    { name: 'Date', property: 'date', type: 'date', validator: Validators.required },
    { name: 'Amount', property: 'amount', type: 'string', validator: Validators.required }
  ];

  public transaction: Transaction = new Transaction();

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
        // Reactivate view
        this.saving = false;
      },
      error: error => {
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
