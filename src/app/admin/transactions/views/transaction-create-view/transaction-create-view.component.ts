import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'crud-transaction-create-view',
  templateUrl: './transaction-create-view.component.html',
  styleUrls: ['./transaction-create-view.component.sass']
})
export class TransactionCreateViewComponent {

  public transaction = new Transaction();

  private formValid = false;

  constructor(
    private service: TransactionService,
    private router: Router
  ) { }

  public onSave(): void {
    this.service.create(this.transaction).subscribe(d => {
      this.router.navigate([`/transactions/${d.id}`]);
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Transaction) {
    this.transaction = value;
  }

  public isAbleToSave() {
    return this.formValid;
  }

}
