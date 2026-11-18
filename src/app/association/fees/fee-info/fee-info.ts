import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { Fee } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-fee-info',
  imports: [AuditInfo, CurrencyPipe, DatePipe, SkeletonModule],
  templateUrl: './fee-info.html'
})
export class FeeInfo {

  public readonly data = input(new Fee());
  public readonly loading = input(false);

}