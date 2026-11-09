import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'ui-status-detail',
  imports: [SkeletonModule],
  templateUrl: './status-detail.html'
})
export class StatusDetail {
  public readonly falseIcon = input<string>();
  public readonly falseText = input('');
  public readonly icon = input('');

  public readonly loading = input(false);
  public readonly name = input('');
  public readonly trueText = input('');
  public readonly value = input(false);

  public get actualIcon() {
    if ((!this.value()) && this.falseIcon()) {
      return this.falseIcon();
    } else {
      return this.icon();
    }
  }

  public get text() {
    if (this.value()) {
      return this.trueText();
    } else {
      return this.falseText();
    }
  }

}
