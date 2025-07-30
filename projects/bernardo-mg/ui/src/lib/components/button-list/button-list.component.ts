
import { Component, Input, output } from '@angular/core';

/**
 * List of links component. They will be shown in the same order as received.
 */
@Component({
  selector: 'ui-button-list',
  imports: [],
  templateUrl: './button-list.component.html'
})
export class ButtonListComponent {

  /**
   * Links to show in the list.
   */
  @Input() public values: any[] = [];

  @Input() public renderer: (d: any) => string = (a) => a;

  public readonly pick = output<any>();

  public onPick(value: any) {
    this.pick.emit(value);
  }

}
