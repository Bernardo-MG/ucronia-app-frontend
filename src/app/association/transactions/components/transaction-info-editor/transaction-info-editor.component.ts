import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-info-editor',
  templateUrl: './transaction-info-editor.component.html'
})
export class TransactionInfoEditorComponent extends InfoEditorComponent<Transaction> implements OnInit {

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
