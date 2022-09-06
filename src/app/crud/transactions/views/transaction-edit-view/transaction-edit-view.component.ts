import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/models/transaction';
import { TransactionService } from '@app/crud/transactions/service/transaction.service';

@Component({
  selector: 'crud-transaction-edit-view',
  templateUrl: './transaction-edit-view.component.html',
  styleUrls: ['./transaction-edit-view.component.sass']
})
export class TransactionEditViewComponent implements OnInit {

  transaction: Transaction = new Transaction();

  constructor(
    private route: ActivatedRoute,
    private service: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  save(data: Transaction): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/transactions']);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/transactions']);
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.transaction = d;
        });
    }
  }

}
