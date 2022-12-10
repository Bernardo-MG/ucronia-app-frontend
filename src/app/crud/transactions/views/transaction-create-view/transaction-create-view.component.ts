import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';
import { Transaction } from '@app/models/transaction';

@Component({
  selector: 'crud-transaction-create-view',
  templateUrl: './transaction-create-view.component.html',
  styleUrls: ['./transaction-create-view.component.sass']
})
export class TransactionCreateViewComponent {

  private transaction = new Transaction();

  private formValid = false;

  constructor(
    private service: TransactionService,
    private router: Router
    ) { }

    public onSave(): void {
      this.service.create(this.transaction).subscribe(d => {
        this.router.navigate([`/data/transaction/${d.id}`]);
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
