import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleValue } from '../../models/link';

/**
 * List of links component. They will be shown in the same order as received.
 */
@Component({
  selector: 'layout-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.sass']
})
export class ButtonListComponent {

  /**
   * Links to show in the list.
   */
  @Input() public values: TitleValue[] = [];

  @Output() public select = new EventEmitter<any>();

  public onSelect(value: any) {
    this.select.emit(value);
  }

}
