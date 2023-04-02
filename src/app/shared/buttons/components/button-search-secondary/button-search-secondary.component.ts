import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-search-secondary',
  templateUrl: './button-search-secondary.component.html',
  styleUrls: ['./button-search-secondary.component.sass']
})
export class ButtonSearchSecondaryComponent {

  @Output() action = new EventEmitter<number>();

  constructor() { }

  public onAction() {
    this.action.emit();
  }

}
