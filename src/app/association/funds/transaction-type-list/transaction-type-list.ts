import { Component, DestroyRef, inject, input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { TransactionType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'assoc-transaction-type-list',
  imports: [ButtonModule, PaginatorModule],
  templateUrl: './transaction-type-list.html'
})
export class TransactionTypeList implements OnChanges {
  private readonly client = inject(UcroniaClient);
  private readonly destroyRef = inject(DestroyRef);
  private request?: Subscription;

  public readonly version = input(0);
  public readonly rows = 10;
  public data = new Page<TransactionType>();
  public loading = false;
  public failed = false;

  public ngOnChanges(): void {
    this.load(this.data.page || 1);
  }

  public changePage(event: PaginatorState): void {
    this.load((event.page ?? 0) + 1);
  }

  public load(page = this.data.page || 1): void {
    this.request?.unsubscribe();
    this.loading = true;
    this.failed = false;

    this.request = this.client.transactionType.page(page, this.rows)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading = false))
      .subscribe({
        next: data => this.data = data,
        error: () => this.failed = true
      });
  }
}
