
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/transaction-service/transaction-service';
import { Transaction } from '@app/domain/transactions/transaction';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { TransactionForm } from '../transaction-form/transaction-form';

@Component({
  selector: 'assoc-transaction-edition',
  imports: [CardModule, SkeletonModule, TransactionForm, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-edition.html'
})
export class TransactionEdition extends InfoEditorStatusComponent<Transaction> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(TransactionService);

  private index = -1;

  constructor() {
    const authContainer = inject(AuthContainer);

    super(new Transaction());
    // Check permissions
    this.editable = authContainer.hasPermission("transaction", "update");
    this.deletable = authContainer.hasPermission("transaction", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.index).subscribe(r => {
      this.router.navigate([`..`], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Transaction> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.update(toSave);
  }

}
