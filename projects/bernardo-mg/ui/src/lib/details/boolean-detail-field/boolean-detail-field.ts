import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'ui-boolean-detail-field',
  imports: [SkeletonModule],
  templateUrl: './boolean-detail-field.html'
})
export class BooleanDetailField {

  public readonly loading = input(false);
  public readonly name = input('');
  public readonly value = input(false);
  public readonly icon = input('');

  public formatMultiline(value: string | null | undefined): string {
    if (value === null || value === undefined) return '';
    return String(value).replace(/\n/g, '<br>');
  }

}
