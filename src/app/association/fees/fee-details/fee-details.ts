
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { Fee } from "@ucronia/domain";
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-fee-details',
  imports: [SkeletonModule, DetailField, DatePipe],
  templateUrl: './fee-details.html'
})
export class FeeDetails {

  public readonly loading = input(false);
  public readonly data = input(new Fee());

}
