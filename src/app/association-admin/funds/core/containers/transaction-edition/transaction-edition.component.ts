import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { Transaction } from '@app/models/transactions/transaction';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../../components/transaction-info/transaction-info.component';

@Component({
  selector: 'assoc-transaction-edition',
  imports: [CommonModule, TransactionFormComponent, TransactionInfoComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-edition.component.html'
})
export class TransactionEditionComponent extends InfoEditorStatusComponent<Transaction> implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(TransactionService);

  private authContainer = inject(AuthContainer);

  private index = -1;

  constructor() {
    super(new Transaction());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("transaction", "update");
    this.deletable = this.authContainer.hasPermission("transaction", "delete");

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
