import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'ui-status-detail',
  imports: [SkeletonModule],
  templateUrl: './status-detail.html'
})
export class StatusDetail {

  public readonly loading = input(false);
  public readonly name = input('');
  public readonly value = input(false);
  public readonly icon = input('');
  public readonly falseIcon = input<string>();
  public readonly trueText = input('');
  public readonly falseText = input('');

  public get color() {
    if (this.value()) {
      return 'green-600';
    } else {
      return 'red-600';
    }
  }

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
