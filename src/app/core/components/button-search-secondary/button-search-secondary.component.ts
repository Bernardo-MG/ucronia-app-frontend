import { Component, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-search-secondary',
  templateUrl: './button-search-secondary.component.html',
  styleUrls: ['./button-search-secondary.component.sass']
})
export class ButtonSearchSecondaryComponent {

  @Output() action = new EventEmitter<number>();

  public icon = faMagnifyingGlass;

  constructor() { }

  public onAction() {
    this.action.emit();
  }

}
