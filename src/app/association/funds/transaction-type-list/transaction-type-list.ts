import { Component, DestroyRef, inject, input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { TransactionType } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
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
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private request?: Subscription;

  private detailRequest?: Subscription;

  public readonly canDelete = input(false);
  public deleting = false;
  public deleteFailed = false;

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
    this.deleteFailed = false;

    this.detailRequest = this.client.transactionType.get(number)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.detailLoading = false))
      .subscribe({
        next: type => this.selectedType = type,
        error: () => this.detailFailed = true
      });
  }

  public confirmDelete(event: Event): void {
    const type = this.selectedType;
    if (!type || !this.canDelete() || this.deleting) {
      return;
    }

    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar este tipo de transacción?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (this.destroyRef.destroyed || this.selectedType !== type || this.editing || this.deleting) {
          return;
        }

        this.deleting = true;
        this.deleteFailed = false;
        this.client.transactionType.delete(type.number)
          .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.deleting = false))
          .subscribe({
            next: () => {
              this.deleting = false;
              this.closeDetails();
              this.load();
            },
            error: () => this.deleteFailed = true
          });
      }
    });
  }

  public closeDetails(): void {
    if (this.deleting) {
      return;
    }
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

    const request = new Subscription();
    this.request = request;
    request.add(this.client.transactionType.page(page, this.rows)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          if (data.content.length === 0 && page > 1) {
            this.load(Math.max(1, Math.min(page - 1, data.totalPages)));
          } else {
            this.data = data;
            this.loading = false;
          }
        },
        error: () => {
          this.loading = false;
          this.failed = true;
        }
      }));
  }
}
