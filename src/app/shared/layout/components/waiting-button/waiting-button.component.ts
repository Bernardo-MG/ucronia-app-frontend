import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconWaitingComponent } from 'icons';

@Component({
    selector: 'layout-waiting-button',
    imports: [CommonModule, IconWaitingComponent],
    templateUrl: './waiting-button.component.html'
})
export class WaitingButtonComponent {

  @Input() public waiting = false;

  @Input() public disabled = false;

  @Input() public name = '';

  @Input() public type = 'button';

  @Output() public action = new EventEmitter<void>();

  public onClick(): void {
    this.action.emit();
  }

}
