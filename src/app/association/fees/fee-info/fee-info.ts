
import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '@app/domain/fees/fee';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-fee-info',
  imports: [CardModule, SkeletonModule, DatePipe],
  templateUrl: './fee-info.html'
})
export class FeeInfo {

  public readonly loading = input(false);

  public readonly data = input(new Fee());

  private readonly router = inject(Router);

  public goToTransaction(index: number) {
    this.router.navigate([`association/admin/funds/transaction/${index}`]);
  }

}
