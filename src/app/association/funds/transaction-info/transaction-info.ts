import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Transaction } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-transaction-info',
  imports: [AuditInfo, CurrencyPipe, DatePipe, SkeletonModule],
  templateUrl: './transaction-info.html'
})
export class TransactionInfo {

  public readonly transaction = input(new Transaction());
  public readonly loading = input(false);

}