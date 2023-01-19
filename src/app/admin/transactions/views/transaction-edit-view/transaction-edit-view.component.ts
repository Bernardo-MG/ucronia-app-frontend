import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'admin-transaction-edit-view',
  templateUrl: './transaction-edit-view.component.html',
  styleUrls: ['./transaction-edit-view.component.sass']
})
export class TransactionEditViewComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

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

  public onSave(): void {
    this.waiting = true;
    this.service.update(this.transaction.id, this.transaction).subscribe({
      next: d => {
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

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.transaction = d;
        });
    }
  }

}
