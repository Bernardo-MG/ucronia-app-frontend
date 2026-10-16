import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-drawer-header',
  templateUrl: './drawer-header.html',
  host: { class: 'block min-w-0' }
})
export class DrawerHeader {
  public readonly title = input.required<string>();
  public readonly subtitle = input('');
  public readonly icon = input.required<string>();
  public readonly tone = input<'blue' | 'green'>('blue');
}
