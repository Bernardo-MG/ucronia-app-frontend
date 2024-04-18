import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../transaction-info/transaction-info.component';

@Component({
  selector: 'assoc-transaction-info-editor',
  standalone: true,
  imports: [TransactionFormComponent, TransactionInfoComponent, ArticleComponent, InfoEditorComponent],
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
      if(indexParam){
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
