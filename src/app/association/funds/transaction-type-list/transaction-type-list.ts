import { Component, DestroyRef, inject, input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { TransactionType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TransactionTypeForm } from '../transaction-type-form/transaction-type-form';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'assoc-transaction-type-list',
  imports: [ButtonModule, PaginatorModule, DrawerModule, DrawerActions, DrawerHeader, TransactionTypeForm],
  templateUrl: './transaction-type-list.html'
})
export class TransactionTypeList implements OnChanges {
  private readonly client = inject(UcroniaClient);
  private readonly destroyRef = inject(DestroyRef);
  private request?: Subscription;

  private detailRequest?: Subscription;

  public readonly canEdit = input(false);
  public selectedNumber?: number;
  public selectedType?: TransactionType;
  public detailLoading = false;
  public detailFailed = false;
  public editing = false;

  public readonly version = input(0);
  public readonly rows = 10;
  public data = new Page<TransactionType>();
  public loading = false;
  public failed = false;

  public ngOnChanges(): void {
    this.load(this.data.page || 1);
  }

  public showDetails(number: number): void {
    this.detailRequest?.unsubscribe();
    this.selectedNumber = number;
    this.selectedType = undefined;
    this.detailLoading = true;
    this.detailFailed = false;

    this.detailRequest = this.client.transactionType.get(number)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.detailLoading = false))
      .subscribe({
        next: type => this.selectedType = type,
        error: () => this.detailFailed = true
      });
  }

  public closeDetails(): void {
    this.detailRequest?.unsubscribe();
    this.selectedNumber = undefined;
    this.selectedType = undefined;
  }

  public onUpdated(type: TransactionType): void {
    this.selectedType = type;
    this.load();
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
