import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'ui-status-detail',
  imports: [SkeletonModule],
  templateUrl: './status-detail.html'
})
export class StatusField {

  public readonly loading = input(false);
  public readonly name = input('');
  public readonly value = input(false);
  public readonly icon = input('');
  public readonly trueText = input('');
  public readonly falseText = input('');

}
