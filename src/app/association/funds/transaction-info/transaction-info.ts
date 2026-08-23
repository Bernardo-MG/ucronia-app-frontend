
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { Transaction } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-transaction-info',
  imports: [CommonModule, SkeletonModule, DetailField],
  templateUrl: './transaction-info.html'
})
export class TransactionInfo {

  public readonly transaction = input(new Transaction());
  public readonly loading = input(false);

}
