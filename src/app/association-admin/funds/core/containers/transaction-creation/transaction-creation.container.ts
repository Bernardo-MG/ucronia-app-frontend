import { Component } from '@angular/core';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { Transaction } from '@app/models/transactions/transaction';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';

@Component({
    selector: 'assoc-transaction-creation',
    imports: [ArticleComponent, TransactionFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './transaction-creation.container.html'
})
export class TransactionCreationComponent extends CreateComponent<Transaction> {

  constructor(
    private service: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Transaction) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
