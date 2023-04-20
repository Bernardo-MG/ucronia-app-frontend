import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-page-button',
  templateUrl: './pagination-page-button.component.html'
})
export class PageButtonComponent {

  @Input() public active = false;

  @Input() public disabled = false;

  @Output() public action = new EventEmitter<number>();

  public onClick() {
    this.action.emit();
  }

  public getCurrentLabel() {
    let label;

    if (this.active) {
      // Current page
      label = 'page';
    } else {
      // Any other page
      label = '';
    }

    return label;
  }

}
