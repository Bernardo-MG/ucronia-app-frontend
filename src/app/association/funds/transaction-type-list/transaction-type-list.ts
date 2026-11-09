import { Component, input, output } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { TransactionType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'assoc-transaction-type-list',
  imports: [ButtonModule, PaginatorModule],
  templateUrl: './transaction-type-list.html'
})
export class TransactionTypeList {

  public readonly failed = input(false);
  public readonly loading = input(false);

  public readonly pageChange = output<number>();
  public readonly retry = output<void>();
  public readonly show = output<number>();

  public readonly data = input.required<Page<TransactionType>>();

  protected readonly rows = 10;

  // Event handlers
  protected onChangePage(event: PaginatorState): void {
    this.pageChange.emit((event.page ?? 0) + 1);
  }

  protected onRetry(): void {
    this.retry.emit();
  }

  protected onShowDetails(number: number): void {
    this.show.emit(number);
  }

}
