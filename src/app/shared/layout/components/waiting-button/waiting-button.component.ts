import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edition-waiting-button',
  templateUrl: './waiting-button.component.html'
})
export class WaitingButtonComponent {

  @Input() public waiting = false;

  @Input() public disabled = false;

  @Input() public name = '';

  @Output() public action = new EventEmitter<void>();

  public onClick(): void {
    this.action.emit();
  }

}
