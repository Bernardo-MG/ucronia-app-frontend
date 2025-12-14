
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Fee } from '@ucronia/domain';
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

}
