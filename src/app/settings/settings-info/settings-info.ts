import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'shared-settings-info',
  imports: [CurrencyPipe, SkeletonModule],
  templateUrl: './settings-info.html'
})
export class SettingsInfo {

  public readonly amount = input<number | null>(null);
  public readonly category = input.required<string>();
  public readonly description = input<string | null | undefined>();
  public readonly icon = input.required<string>();
  public readonly loading = input(false);
  public readonly number = input.required<number>();
  public readonly positiveStatus = input(true);
  public readonly showDescription = input(false);
  public readonly showReference = input(true);
  public readonly status = input('');
  public readonly title = input.required<string>();

}
