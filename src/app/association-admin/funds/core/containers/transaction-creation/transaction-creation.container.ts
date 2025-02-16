import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { Transaction } from '@app/models/transactions/transaction';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';

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
