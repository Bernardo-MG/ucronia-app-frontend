import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'assoc-transaction-create',
  standalone: true,
  imports: [ArticleComponent, TransactionFormComponent],
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
