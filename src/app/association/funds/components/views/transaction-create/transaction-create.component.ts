import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/funds/models/transaction';
import { TransactionService } from '@app/association/funds/service/transaction.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../data/transaction-form/transaction-form.component';

@Component({
  selector: 'assoc-transaction-create',
  standalone: true,
  imports: [ArticleComponent, TransactionFormComponent, ResponsiveShortColumnsDirective],
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
    return '/funds';
  }

}
