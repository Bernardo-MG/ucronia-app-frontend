
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Transaction } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-transaction-info',
  imports: [SkeletonModule,  DatePipe],
  templateUrl: './transaction-info.html'
})
export class TransactionInfo {

  public readonly transaction = input(new Transaction());

}
