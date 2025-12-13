import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'ui-detail-field',
  imports: [SkeletonModule],
  templateUrl: './detail-field.html'
})
export class DetailField {

  public loading = input(false);
  public name = input('');
  public value = input<any>('');
  public icon = input('');

}
