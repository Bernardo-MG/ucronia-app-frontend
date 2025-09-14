
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/transaction-service/transaction-service';
import { Transaction } from '@app/domain/transactions/transaction';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { TransactionForm } from '../transaction-form/transaction-form';

@Component({
  selector: 'assoc-transaction-creation',
  imports: [CardModule, TransactionForm, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-creation.html'
})
export class TransactionCreation extends CreateComponent<Transaction> {

  private readonly service = inject(TransactionService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Transaction) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
