import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { Fee } from '@ucronia/domain';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';

@Component({
  selector: 'assoc-fee-info',
  imports: [AuditInfo, CurrencyPipe, DatePipe, SkeletonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './fee-info.html'
})
export class FeeInfo {

  public readonly data = input(new Fee());
  public readonly loading = input(false);

}