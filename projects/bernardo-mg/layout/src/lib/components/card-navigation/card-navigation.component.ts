import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTab } from '../../models/card-tab';

@Component({
  selector: 'layout-card-navigation',
  imports: [CommonModule],
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

  public onPickTab(code: string) {
    this.pickTab.emit(code);

    this.active = code;
  }

}
