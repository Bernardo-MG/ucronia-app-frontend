import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconWaitingComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'layout-waiting-button-wrapper',
    imports: [CommonModule, IconWaitingComponent],
    templateUrl: './waiting-button-wrapper.component.html'
})
export class WaitingButtonWrapperComponent {

  @Input() public waiting = false;

  @Input() public disabled = false;

  @Input() public name = '';

  @Input() public type = 'button';

  @Output() public action = new EventEmitter<void>();

  public onClick(): void {
    this.action.emit();
  }

}
