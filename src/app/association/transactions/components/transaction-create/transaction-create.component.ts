import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-create',
  templateUrl: './transaction-create.component.html'
})
export class TransactionCreateComponent extends CreateComponent<Transaction> {

  constructor(
    private service: TransactionService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Transaction): string {
    return `/funds/transaction/${saved.index}`;
  }

}
