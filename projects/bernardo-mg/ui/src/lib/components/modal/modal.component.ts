
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

/**
 * Modal component. To be shown should be activated outside.
 */
@Component({
  selector: 'ui-modal',
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  public readonly title = input('Modal');

  @Input() public acceptText = 'Aceptar';

  public readonly name = input('modal');

  @Output() public readonly accept = new EventEmitter<void>();

}
