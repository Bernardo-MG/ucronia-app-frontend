
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTab } from '../../models/card-tab';

/**
 * Card navigation, sets up tabs and handles status. This includes active tab, and disabled tabs.
 */
@Component({
  selector: 'ui-card-navigation',
  imports: [],
  templateUrl: './card-navigation.component.html'
})
export class CardNavigationComponent {

  private _tabs: CardTab[] = [];

  @Input() public set tabs(data: CardTab[]) {
    this._tabs = data;
    if (data.length > 0) {
      this.active = data[0].code;
    }
  }

  public get tabs() {
    return this._tabs;
  }

  @Output() public readonly pickTab = new EventEmitter<string>();

  public active = '';

  public onPickTab(tab: CardTab) {
    if (!tab.disabled) {
      this.active = tab.code;
      this.pickTab.emit(tab.code);
    }
  }

}
