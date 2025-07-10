import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { Transaction } from '@app/models/transactions/transaction';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../../components/transaction-info/transaction-info.component';

@Component({
  selector: 'assoc-transaction-edition',
  imports: [CommonModule, CardModule, TransactionFormComponent, TransactionInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-edition.component.html'
})
export class TransactionEditionComponent extends InfoEditorStatusComponent<Transaction> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(TransactionService);

  private index = -1;

  constructor(
    authContainer: AuthContainer
  ) {
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
    return this.service.update(this.data.index, toSave);
  }

}
