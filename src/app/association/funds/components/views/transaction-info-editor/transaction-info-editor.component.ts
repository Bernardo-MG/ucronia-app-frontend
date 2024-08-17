import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/funds/models/transaction';
import { TransactionService } from '@app/association/funds/service/transaction.service';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { TransactionFormComponent } from '../../data/transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../../data/transaction-info/transaction-info.component';

@Component({
  selector: 'assoc-transaction-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, TransactionFormComponent, TransactionInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './transaction-info-editor.component.html'
})
export class TransactionInfoEditorComponent extends InfoEditorStatusComponent<Transaction> implements OnInit {

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
      this.router.navigate([`/funds`]);
    });
  }

  protected override read(): Observable<Transaction> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: Transaction): Observable<Transaction> {
    return this.service.update(this.data.index, toSave);
  }

}
