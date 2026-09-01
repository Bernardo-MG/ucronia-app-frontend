import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Fee } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-fee-info',
  imports: [CurrencyPipe, DatePipe, SkeletonModule],
  templateUrl: './fee-info.html'
})
export class FeeInfo {

  public readonly loading = input(false);
  public readonly data = input(new Fee());

}