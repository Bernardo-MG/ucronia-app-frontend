import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../../components/transaction-info/transaction-info.component';
import { Transaction } from '@app/models/transactions/transaction';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';

@Component({
    selector: 'assoc-transaction-edition',
    imports: [CommonModule, FormModule, CardModule, TransactionFormComponent, TransactionInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
    templateUrl: './transaction-edition.component.html'
})
export class TransactionEditionComponent extends InfoEditorStatusComponent<Transaction> implements OnInit {

  private index = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authContainer: AuthContainer
  ) {
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
