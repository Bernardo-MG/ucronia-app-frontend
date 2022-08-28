import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/models/transaction';
import { AdminBalanceService } from '../../services/admin-balance.service';

@Component({
  selector: 'app-admin-balance-transaction-create-view',
  templateUrl: './admin-balance-transaction-create-view.component.html',
  styleUrls: ['./admin-balance-transaction-create-view.component.sass']
})
export class AdminBalanceTransactionCreateViewComponent {

  constructor(
    private service: AdminBalanceService,
    private router: Router
    ) { }

  save(data: Transaction): void {
    this.service.create(data).subscribe(d => {
      this.router.navigate(['/admin/balance']);
    });
  }

}
