import { Component } from '@angular/core';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { Transaction } from '@app/models/transactions/transaction';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../../core/components/transaction-form/transaction-form.component';

@Component({
  selector: 'assoc-transaction-create',
  standalone: true,
  imports: [CardModule, ArticleComponent, TransactionFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-create.component.html'
})
export class TransactionCreateComponent extends CreateComponent<Transaction> {

  constructor(
    private service: TransactionService
  ) {
    super();
  }

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.create(toSave);
  }

}
